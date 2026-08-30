/**
 * WMO weather interpretation codes to localized dictionary keys. The mapping
 * is data (stable WMO codes); the visible text lives in the `weather`
 * locale dictionaries, reached through the typed `t` seat.
 */
import type { WeatherKey } from './locales.ts';
/**
 * Map a WMO weather interpretation code to its locale dictionary key.
 * @param code - the WMO code reported by Open-Meteo.
 * @returns the dictionary key whose value describes that condition.
 */
export declare function weatherCodeKey(code: number): WeatherKey;
/** Backdrop state derived from a WMO code, mapped to meteocons art. */
export type WeatherBackdrop = 'sunny' | 'partlyCloudy' | 'cloudy' | 'fog' | 'drizzle' | 'freezingDrizzle' | 'rain' | 'freezingRain' | 'snow' | 'hail' | 'storm';
/**
 * Map a WMO weather interpretation code to its backdrop state.
 * @param code - the WMO code reported by Open-Meteo.
 * @returns the backdrop state used to pick the animated SVG art.
 */
export declare function weatherBackdrop(code: number): WeatherBackdrop;
