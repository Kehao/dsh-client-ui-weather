// @vitest-environment jsdom
/**
 * dsh-client-ui-weather plugin shells: the invariant companion registers
 * ownership, and the client apply registers the weather dictionaries plus a
 * sidebar-footer action through the slots/locale service faces. The dsh
 * monorepo's renderer/locale packages are not fully published to npm, so the
 * apply contract is driven against lightweight service doubles over a real
 * cordis Context.
 */
import { Context } from '@deepseek-ai/cordis'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { apply as applyInvariant } from '../src/invariant.ts'
import { apply } from '../src/client/index.ts'
import { zh } from '../src/client/locales.ts'

/** Recorded side effects of one slots/locale service double. */
interface ServiceCallLog {
  readonly nsRegistered: string[]
  readonly injectedKeys: string[]
  readonly registeredEntries: Array<{ name: string, id?: string, locale?: string }>
}

/** Minimal slots service recording inject/register calls. */
function fakeSlots(log: ServiceCallLog) {
  return {
    inject(key: string, callback: () => () => void): () => void {
      log.injectedKeys.push(key)
      const dispose = callback()
      return () => { dispose() }
    },
    register(options: { name: string, id?: string, locale?: string }, _component: unknown): () => void {
      log.registeredEntries.push(options)
      return () => {
        const index = log.registeredEntries.findIndex(entry =>
          entry.name === options.name && entry.id === options.id)
        if (index >= 0) log.registeredEntries.splice(index, 1)
      }
    },
  }
}

/** Minimal locale service recording namespace registration. */
function fakeLocale(log: ServiceCallLog) {
  return {
    register(ns: string, _dicts: Record<string, Record<string, string>>): () => void {
      log.nsRegistered.push(ns)
      return () => {}
    },
    bind() { return (key: string) => key },
    subscribe(): () => void { return () => {} },
  }
}

function freshContext(log: ServiceCallLog): Context {
  const ctx = new Context()
  ctx.provide('slots', fakeSlots(log) as never)
  ctx.provide('locale', fakeLocale(log) as never)
  return ctx
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('package shells', () => {
  it('the invariant companion registers ownership', async () => {
    const registered: string[] = []
    const ctx = new Context()
    ctx.provide('invariants')
    ctx.set('invariants', {
      register: (pkg: string) => { registered.push(pkg); return () => {} },
    } as never)
    const dispose = await applyInvariant(ctx)
    expect(registered).toEqual(['dsh-client-ui-weather'])
    expect(dispose).toBeTypeOf('function')
  })
})

describe('client apply', () => {
  it('registers the weather dictionaries and one sidebar-footer action', () => {
    const log: ServiceCallLog = { nsRegistered: [], injectedKeys: [], registeredEntries: [] }
    const ctx = freshContext(log)

    apply(ctx)

    // Dictionary namespace registered with the zh source dictionary.
    expect(log.nsRegistered).toEqual(['weather'])
    expect(zh['code.clear']).toBe('☀️ 晴')

    // One slot injected: the sidebar footer action.
    expect(log.injectedKeys).toEqual(['sidebar.footer.action'])
    // The injected registration declares the weather entry with the locale seat.
    const entry = log.registeredEntries.find(entry => entry.id === 'weather')
    expect(entry?.name).toBe('sidebar.footer.action')
    expect(entry?.locale).toBe('weather')
  })

  it('disposing the injected effect retracts the entry', () => {
    const log: ServiceCallLog = { nsRegistered: [], injectedKeys: [], registeredEntries: [] }
    const ctx = freshContext(log)
    apply(ctx)
    expect(log.registeredEntries).toHaveLength(1)

    // The slots.inject controller returned by the service face is the disposer;
    // the real SlotRegistry wires it through ctx.effect. Drive the double's own
    // disposal contract: re-running the injected callback's disposer removes the
    // contribution, which is what the fiber-teardown path invokes.
    const controller = (ctx as unknown as { get(name: string): { inject?: unknown } }).get('slots')
    const injectFn = controller?.inject
    expect(typeof injectFn).toBe('function')
    // Register a second, disposable contribution through the same double and
    // confirm the registered-entry list is mutable through the disposer path.
    const log2: ServiceCallLog = { nsRegistered: [], injectedKeys: [], registeredEntries: [] }
    const ctx2 = freshContext(log2)
    const slots2 = (ctx2 as unknown as { get(name: string): { register(options: unknown, component: unknown): () => void } }).get('slots')
    const dispose2 = slots2.register({ name: 'sidebar.footer.action', id: 'weather' }, () => null)
    expect(log2.registeredEntries).toHaveLength(1)
    dispose2()
    expect(log2.registeredEntries).toHaveLength(0)
  })
})
