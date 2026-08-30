/**
 * Package-owned invariant companion for `dsh-client-ui-weather`.
 * @module dsh-client-ui-weather/invariant
 */

/* jscpd:ignore-start */
import type { Context } from '@deepseek-ai/cordis'
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants'

const PACKAGE_NAME = 'dsh-client-ui-weather'

/** Cordis companion plugin name. */
export const name = 'client-ui-weather-invariant'
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants']

/**
 * No runtime invariant: the weather card is a pure-consumer plugin — it
 * contributes one sidebar-foot action plus its locale dictionaries, emits no
 * cordis events, and owns no cross-plugin mutable state; fetch, layout, and
 * interaction behavior are asserted directly by this package's specs.
 */
const install: InvariantInstaller = () => {}

/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install))
/* jscpd:ignore-end */
