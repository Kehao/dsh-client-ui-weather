/**
 * Local type declarations for the dsh web client framework surfaces this
 * plugin composes against. The official packages (dsh-client-ui-slots,
 * dsh-client-locale, dsh-client-ui-renderer, dsh-client-ui-sidebar) are not
 * fully published to npm, so the standalone package carries the minimal typed
 * contract it relies on: the slot props algebra, the locale service, and the
 * sidebar footer-action slot declaration. Runtime identity never crosses
 * these declarations — they are erased at build time and the host shell
 * supplies the real implementations.
 */

declare module '@deepseek-ai/dsh-client-ui-slots' {
  /** Locale namespace registry merged by dictionary-owning plugins. */
  export interface LocaleNamespaceMap {}

  /** Translate function bound to one locale namespace. */
  export type TranslateNS<N extends keyof LocaleNamespaceMap & string> = (
    key: (LocaleNamespaceMap[N] & string) | (keyof LocaleNamespaceMap & string),
    params?: Record<string, unknown>,
  ) => string

  /** Global standard props supplied by the host shell to every entry. */
  export interface GlobalStandardProps {
    useSessions?: unknown
    useSessionPendingInteraction?: unknown
    useWorkspaces?: unknown
  }

  /** Runtime props share for a slot key: owner props plus standard seats. */
  export type PropsRuntime<K extends keyof SlotMap & string> =
    K extends 'sidebar.footer.action' ? { wide: boolean } & GlobalStandardProps : object

  /** Locale props share: the bound translate seat. */
  export type PropsLocale<N extends keyof LocaleNamespaceMap & string> = {
    t: TranslateNS<N>
  }

  /** Slot table merged by the packages that declare slots. */
  export interface SlotMap {
    'sidebar.footer.action': { kind: 'list'; scope: 'root' }
  }
}

declare module '@deepseek-ai/dsh-client-ui-sidebar/client' {}

declare module '@deepseek-ai/dsh-client-locale/client' {}

declare module '@deepseek-ai/dsh-client-ui-renderer/client' {}

declare module '@deepseek-ai/dsh-invariants' {
  /** One package's runtime-invariant installer (companion plugin contract). */
  export type InvariantInstaller = () => (() => void) | void
}

declare module '@deepseek-ai/cordis' {
  interface LocaleFace {
    /** Register one locale namespace's dictionaries; returns the disposer. */
    register(ns: string, dicts: Record<string, Record<string, string>>): () => void
    /** Bind a namespace to a translate function. */
    bind(ns: string): (key: string, params?: Record<string, unknown>) => string
    /** Subscribe to locale changes. */
    subscribe(listener: () => void): () => void
  }

  interface SlotRegisterOptions {
    name: string
    id?: string
    order?: number
    locale?: string
    children?: Record<string, { kind: 'list' | 'single' | 'chain'; scope: 'root' | 'session' }>
    inject?: () => unknown
  }

  interface SlotRegistryFace {
    /** Wait for a slot declaration and register a contribution for its lifetime. */
    inject(key: string, callback: () => () => void): () => void
    /** Register one entry into a declared slot. */
    register(options: SlotRegisterOptions, component: unknown): () => void
    /** Entries currently occupying a slot. */
    entries(name: string): Array<{ options: { id?: string } }>
  }

  interface Context {
    /** Register a lifecycled effect; the returned disposer runs on teardown. */
    effect(fn: () => (() => void) | void, label?: string): () => void
    locale: LocaleFace
    slots: SlotRegistryFace
    /** Invariant companion registry (provided by the invariants package). */
    invariants: {
      register(pkg: string, installer: () => void): () => void
    }
  }
}
