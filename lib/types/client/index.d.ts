/**
 * Weather plugin, browser half: contributes one sidebar-foot action showing
 * the local weather, with a manual city search override. All data access is
 * injected as plain callbacks so the component stays presentation-only.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
import { type WeatherKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Sidebar weather card copy. */
        weather: WeatherKey;
    }
}
export type { WeatherWidgetProps, WeatherInjected } from './WeatherWidget.tsx';
export type { CityResult, CurrentWeather, WeatherLocation } from './weather-api.ts';
/** Required services for the footer-action registration and its dictionaries. */
export declare const inject: string[];
/**
 * Client plugin body: register the dictionaries and the sidebar-foot entry.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
