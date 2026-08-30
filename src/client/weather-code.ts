/**
 * WMO weather interpretation codes to localized dictionary keys. The mapping
 * is data (stable WMO codes); the visible text lives in the `weather`
 * locale dictionaries, reached through the typed `t` seat.
 */
import type { WeatherKey } from './locales.ts'

/**
 * Map a WMO weather interpretation code to its locale dictionary key.
 * @param code - the WMO code reported by Open-Meteo.
 * @returns the dictionary key whose value describes that condition.
 */
export function weatherCodeKey(code: number): WeatherKey {
  if (code === 0) return 'code.clear'
  if (code === 1) return 'code.mainlyClear'
  if (code === 2) return 'code.partlyCloudy'
  if (code === 3) return 'code.overcast'
  if (code === 45 || code === 48) return 'code.fog'
  if (code === 51 || code === 53 || code === 55) return 'code.drizzle'
  if (code === 56 || code === 57) return 'code.freezingDrizzle'
  if (code === 61 || code === 63 || code === 65) return 'code.rain'
  if (code === 66 || code === 67) return 'code.freezingRain'
  if (code === 71 || code === 73 || code === 75) return 'code.snow'
  if (code === 77) return 'code.snowGrains'
  if (code === 80 || code === 81 || code === 82) return 'code.rainShowers'
  if (code === 85 || code === 86) return 'code.snowShowers'
  if (code === 95) return 'code.thunderstorm'
  if (code === 96 || code === 99) return 'code.thunderstormHail'
  return 'code.overcast'
}

/** Backdrop state derived from a WMO code, mapped to meteocons art. */
export type WeatherBackdrop =
  | 'sunny'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'freezingDrizzle'
  | 'rain'
  | 'freezingRain'
  | 'snow'
  | 'hail'
  | 'storm'

/**
 * Map a WMO weather interpretation code to its backdrop state.
 * @param code - the WMO code reported by Open-Meteo.
 * @returns the backdrop state used to pick the animated SVG art.
 */
export function weatherBackdrop(code: number): WeatherBackdrop {
  if (code === 0) return 'sunny'
  if (code === 1 || code === 2) return 'partlyCloudy'
  if (code === 3) return 'cloudy'
  if (code === 45 || code === 48) return 'fog'
  if (code === 51 || code === 53 || code === 55) return 'drizzle'
  if (code === 56 || code === 57) return 'freezingDrizzle'
  if (code === 61 || code === 63 || code === 65) return 'rain'
  if (code === 66 || code === 67) return 'freezingRain'
  if (code === 71 || code === 73 || code === 75 || code === 77) return 'snow'
  if (code === 80 || code === 81 || code === 82) return 'rain'
  if (code === 85 || code === 86) return 'snow'
  if (code === 95) return 'storm'
  if (code === 96 || code === 99) return 'hail'
  return 'cloudy'
}
