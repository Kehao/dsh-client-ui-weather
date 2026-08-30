/**
 * Self-contained build for dsh-client-ui-weather. Runs on `prepare` (git
 * installs) and `build`, with no monorepo context: every input lives in this
 * package. Emits the node half (ESM) and the browser half (CJS bundle in the
 * dsh client-modules wire format: `window.__ModuleLoader__.load({ id,
 * factory })`), with CSS Modules compiled into hashed class maps plus an
 * injected style tag.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { build } from 'esbuild'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PKG = 'dsh-client-ui-weather'

/** Platform modules the dsh shell seeds; the bundle requires, never inlines. */
const PLATFORM_EXTERNALS = [
  'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-store', '@deepseek-ai/dsh-client-ui-slots', '@deepseek-ai/dsh-client-ui-primitives',
]

/** Hash one CSS Modules local class into a stable browser class name. */
function hashClass(path, local) {
  return `${createHash('sha256').update(`${path}:${local}`).digest('hex').slice(0, 8)}_${local}`
}

/** Inline `*.module.css` as a JS module exporting the class map. */
const cssModulesPlugin = {
  name: 'dsh-css-modules-inline',
  setup(build_) {
    build_.onLoad({ filter: /\.module\.css$/ }, (args) => {
      const source = readFileSync(args.path, 'utf8')
      const tagId = `${PKG}/${relative(ROOT, args.path)}`
      let css = source
      const classMap = {}
      // Rewrite each `.local` selector to its hashed name.
      for (const match of css.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g)) {
        const local = match[1]
        if (classMap[local] !== undefined) continue
        const hashed = hashClass(args.path, local)
        classMap[local] = hashed
        css = css.replace(new RegExp(`\\.${local}\\b`, 'g'), `.${hashed}`)
      }
      const contents = [
        `const css = ${JSON.stringify(css)};`,
        `const tagId = ${JSON.stringify(tagId)};`,
        "if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=\"' + tagId + '\"]') === null) {",
        "  const tag = document.createElement('style');",
        `  tag.dataset.plugin = ${JSON.stringify(PKG)};`,
        '  tag.dataset.pluginCss = tagId;',
        '  tag.textContent = css;',
        '  document.head.appendChild(tag);',
        '}',
        `export default ${JSON.stringify(classMap)};`,
      ].join('\n')
      return { contents, loader: 'js' }
    })
  },
}

const shared = {
  bundle: true,
  sourcemap: true,
  target: 'es2022',
  logLevel: 'info',
}

// Node half: ESM library entries (index + invariant).
await build({
  ...shared,
  entryPoints: ['src/index.ts', 'src/invariant.ts'],
  outdir: 'lib',
  format: 'esm',
  platform: 'node',
  packages: 'external',
})

// Type declarations come from tsc (build/types.mjs runs it when available).
mkdirSync('lib/types', { recursive: true })

// Browser half: one CJS bundle in the client-modules wire format.
await build({
  ...shared,
  entryPoints: ['src/client/index.ts'],
  outfile: 'lib/client.js',
  format: 'cjs',
  platform: 'browser',
  external: PLATFORM_EXTERNALS,
  plugins: [cssModulesPlugin],
  banner: {
    js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PKG)}, factory: (require) => {`,
  },
  footer: {
    js: 'return module.exports; } });',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  },
})

console.log(`built ${PKG}: lib/index.js, lib/invariant.js, lib/client.js`)

// Type declarations from the local tsc (emitDeclarationOnly); required for
// the published `exports` types. Resolves through node_modules/typescript when
// installed; skips gracefully when the dev toolchain is absent (the browser
// bundle is what the dsh runtime consumes).
const tscBin = fileURLToPath(new URL('../node_modules/typescript/bin/tsc', import.meta.url))
const { execFileSync } = await import('node:child_process')
try {
  execFileSync(process.execPath, [tscBin, '-p', 'tsconfig.json'], { cwd: ROOT, stdio: 'inherit' })
  console.log(`built ${PKG}: lib/types/**/*.d.ts`)
} catch (error) {
  console.warn(`type declarations skipped: ${error instanceof Error ? error.message : String(error)}`)
}
