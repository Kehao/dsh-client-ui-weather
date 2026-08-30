/**
 * Local test doubles replacing the dsh monorepo's test-runtime package, which
 * is not fully published to npm. Only what the weather specs consume:
 * a translate stub and an in-memory settings-scope face.
 */

/**
 * Build a translate stub resolving through `dicts` in order (namespace first,
 * then the shared common vocabulary), falling back to the key — the same
 * resolution order as the real locale chain.
 * @param dicts - dictionaries consulted in order.
 * @returns the translate function (assignable to any `XxxProps['t']` seat).
 */
export function makeTranslate(
  ...dicts: readonly Record<string, string>[]
): (key: string, params?: Record<string, unknown>) => string {
  return (key, params) => {
    let template = key
    for (const dict of dicts) {
      const hit = dict[key]
      if (hit !== undefined) {
        template = hit
        break
      }
    }
    if (!params) return template
    return template.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in params ? String(params[name]) : match)
  }
}

/** Minimal settings-scope face the registration spec's locale plugin needs. */
export function stubSettingsScope() {
  let snapshot = {
    status: 'loading', value: undefined, base: undefined, user: undefined,
    revision: undefined, writable: false, mode: 'host',
  }
  const listeners = new Set<() => void>()
  return {
    scope: {
      getSnapshot: () => snapshot,
      subscribe: (listener: () => void) => {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
      },
      mutate: () => Promise.resolve(),
      set: () => Promise.resolve(),
      unset: () => Promise.resolve(),
    },
  }
}
