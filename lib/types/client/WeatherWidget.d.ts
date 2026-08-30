import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { CurrentWeather, CityResult, WeatherLocation } from './weather-api.ts';
/** The inject face: browser-side data access, kept out of the component. */
export interface WeatherInjected {
    /** Resolve the local coordinates (geolocation, then IP fallback). */
    resolveLocation: () => Promise<WeatherLocation>;
    /** Fetch current conditions for a coordinate pair. */
    fetchWeather: (location: WeatherLocation) => Promise<CurrentWeather>;
    /** Search settlements by name for the manual city override. */
    searchCity: (query: string) => Promise<CityResult[]>;
}
/** Full component props: sidebar owner input plus the injected data access. */
export type WeatherWidgetProps = PropsRuntime<'sidebar.footer.action'> & WeatherInjected & PropsLocale<'weather'>;
/**
 * Sidebar-foot weather card: auto-locates the browser (geolocation, then IP),
 * shows current conditions, and lets the user search a city to override the
 * location. Collapsed to a temperature pill on the rail.
 */
export declare function WeatherWidget({ wide, t, resolveLocation, fetchWeather, searchCity }: WeatherWidgetProps): import("react").JSX.Element;
