/**
 * Weather plugin, browser half: contributes one sidebar-foot action showing
 * the local weather, with a manual city search override. All data access is
 * injected as plain callbacks so the component stays presentation-only.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the SlotRegistry service merge (ctx.slots).
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Type-only: pulls ui-sidebar's SlotMap merge so PropsRuntime resolves.
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { WeatherWidget, type WeatherInjected } from './WeatherWidget.tsx'
import { en, NS, zh, type WeatherKey } from './locales.ts'
import { fetchCurrentWeather, resolveLocation, searchCity } from './weather-api.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Sidebar weather card copy. */
    weather: WeatherKey
  }
}

export type { WeatherWidgetProps, WeatherInjected } from './WeatherWidget.tsx'
export type { CityResult, CurrentWeather, WeatherLocation } from './weather-api.ts'

/** Required services for the footer-action registration and its dictionaries. */
export const inject = ['slots', 'locale']

/**
 * Client plugin body: register the dictionaries and the sidebar-foot entry.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-weather: dictionaries')
  ctx.slots.inject('sidebar.footer.action', () =>
    ctx.slots.register({
      name: 'sidebar.footer.action',
      id: 'weather',
      order: 100,
      locale: NS,
      inject: (): WeatherInjected => ({
        resolveLocation,
        fetchWeather: ({ latitude, longitude }) => fetchCurrentWeather(latitude, longitude),
        searchCity,
      }),
    }, WeatherWidget))
}
