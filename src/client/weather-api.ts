/**
 * Weather data layer: React-free browser fetchers over the free, keyless
 * Open-Meteo forecast/geocoding APIs, IP-based location services, and the
 * BigDataCloud reverse-geocode client. Pure functions only — no cordis, no
 * React, no module-level state — so the widget owns its fetch lifecycle and
 * the specs drive every branch with a stubbed global `fetch`/geolocation.
 */

/** A resolved observation point for the weather card. */
export interface WeatherLocation {
  /** WGS84 latitude in degrees. */
  readonly latitude: number
  /** WGS84 longitude in degrees. */
  readonly longitude: number
  /** Best available place name (city, or a localized fallback when unknown). */
  readonly name?: string
}

/** Current conditions as returned by the Open-Meteo forecast API. */
export interface CurrentWeather {
  /** Air temperature at 2 m, °C. */
  readonly temperature: number
  /** Apparent (feels-like) temperature, °C. */
  readonly apparentTemperature: number
  /** Relative humidity at 2 m, %. */
  readonly humidity: number
  /** Wind speed at 10 m, km/h. */
  readonly windSpeed: number
  /** WMO weather interpretation code. */
  readonly weatherCode: number
  /** ISO 8601 time of the observation, local to the location. */
  readonly time: string
}

/** One Open-Meteo geocoding hit for the manual city search. */
export interface CityResult {
  /** Stable geocoding entry id. */
  readonly id: number
  /** City or settlement name. */
  readonly name: string
  /** First-level administrative division, when reported. */
  readonly admin1?: string
  /** Country name, when reported. */
  readonly country?: string
  /** WGS84 latitude in degrees. */
  readonly latitude: number
  /** WGS84 longitude in degrees. */
  readonly longitude: number
}

/** Thrown when automatic location resolution (geolocation + IP fallbacks) fails. */
export class LocationUnavailableError extends Error {}

/** Thrown when the weather or geocoding API request fails. */
export class WeatherApiError extends Error {}

/** Shortcut cities offered in the search popup so users can switch without typing. */
export const POPULAR_CITIES: readonly CityResult[] = [
  { id: 1816670, name: '北京', admin1: '北京', country: '中国', latitude: 39.9075, longitude: 116.39723 },
  { id: 1796236, name: '上海', admin1: '上海', country: '中国', latitude: 31.2304, longitude: 121.4737 },
  { id: 1809858, name: '广州', admin1: '广东', country: '中国', latitude: 23.1291, longitude: 113.2644 },
  { id: 1795565, name: '深圳', admin1: '广东', country: '中国', latitude: 22.5431, longitude: 114.0579 },
  { id: 1808926, name: '杭州', admin1: '浙江', country: '中国', latitude: 30.2741, longitude: 120.1551 },
  { id: 1815286, name: '成都', admin1: '四川', country: '中国', latitude: 30.5728, longitude: 104.0668 },
  { id: 1814905, name: '重庆', admin1: '重庆', country: '中国', latitude: 29.5628, longitude: 106.5528 },
  { id: 1797929, name: '武汉', admin1: '湖北', country: '中国', latitude: 30.5928, longitude: 114.3055 },
  { id: 1799962, name: '南京', admin1: '江苏', country: '中国', latitude: 32.0603, longitude: 118.7969 },
  { id: 1806260, name: '西安', admin1: '陕西', country: '中国', latitude: 34.3416, longitude: 108.9398 },
]

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
const IP_LOOKUP_URLS = [
  'https://ipwho.is/',
  'https://ipapi.co/json/',
] as const

/** Browser geolocation prompt cap before falling back to IP location. */
const GEOLOCATION_TIMEOUT_MS = 8_000

/**
 * Fetch current conditions for a coordinate pair from Open-Meteo.
 * @param latitude - WGS84 latitude in degrees.
 * @param longitude - WGS84 longitude in degrees.
 * @returns parsed current conditions.
 * @throws {WeatherApiError} when the request fails or the payload is unusable.
 */
export async function fetchCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
    timezone: 'auto',
  })
  const payload = await requestJson<{
    current?: {
      time?: unknown
      temperature_2m?: unknown
      apparent_temperature?: unknown
      relative_humidity_2m?: unknown
      weather_code?: unknown
      wind_speed_10m?: unknown
    }
  }>(`${FORECAST_URL}?${params}`)
  const current = payload.current
  if (
    current === undefined
    || typeof current.temperature_2m !== 'number'
    || typeof current.apparent_temperature !== 'number'
    || typeof current.relative_humidity_2m !== 'number'
    || typeof current.weather_code !== 'number'
    || typeof current.wind_speed_10m !== 'number'
  ) {
    throw new WeatherApiError('Open-Meteo forecast payload lacks current conditions')
  }
  return {
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    time: typeof current.time === 'string' ? current.time : '',
  }
}

/**
 * Search settlements by name through Open-Meteo geocoding.
 * @param query - free-form city/settlement query.
 * @returns up to five matching settlements.
 * @throws {WeatherApiError} when the request fails or returns a non-list payload.
 */
export async function searchCity(query: string): Promise<CityResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'zh',
    format: 'json',
  })
  const payload = await requestJson<{ results?: unknown }>(`${GEOCODING_URL}?${params}`)
  if (!Array.isArray(payload.results)) return []
  const results: CityResult[] = []
  for (const raw of payload.results) {
    const entry = raw as {
      id?: unknown
      name?: unknown
      admin1?: unknown
      country?: unknown
      latitude?: unknown
      longitude?: unknown
    }
    if (
      typeof entry.id !== 'number'
      || typeof entry.name !== 'string'
      || typeof entry.latitude !== 'number'
      || typeof entry.longitude !== 'number'
    ) continue
    results.push({
      id: entry.id,
      name: entry.name,
      ...(typeof entry.admin1 === 'string' ? { admin1: entry.admin1 } : {}),
      ...(typeof entry.country === 'string' ? { country: entry.country } : {}),
      latitude: entry.latitude,
      longitude: entry.longitude,
    })
  }
  return results
}

/**
 * Resolve the browser's location: ask the geolocation API first (the most
 * precise "local"), then fall back to IP lookups, then give up.
 * @returns coordinates plus the best-known place name.
 * @throws {LocationUnavailableError} when every source fails or is denied.
 */
export async function resolveLocation(): Promise<WeatherLocation> {
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    try {
      const coords = await browserCoords()
      let name: string | undefined
      try {
        name = await reverseGeocode(coords.latitude, coords.longitude)
      } catch {
        // The coordinates are still valid without a place name.
      }
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        ...(name !== undefined ? { name } : {}),
      }
    } catch {
      // Fall through to IP location; the geolocation failure is not fatal.
    }
  }
  for (const url of IP_LOOKUP_URLS) {
    try {
      const location = await ipLocation(url)
      if (location !== undefined) return location
    } catch {
      // Try the next IP source.
    }
  }
  throw new LocationUnavailableError('no geolocation or IP location source answered')
}

/**
 * Reverse-geocode a coordinate pair into a place name via BigDataCloud.
 * @param latitude - WGS84 latitude in degrees.
 * @param longitude - WGS84 longitude in degrees.
 * @returns the best locality name, or undefined when the API does not report one.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string | undefined> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: 'zh',
  })
  const payload = await requestJson<{ city?: unknown; locality?: unknown }>(
    `${REVERSE_GEOCODE_URL}?${params}`,
  )
  if (typeof payload.city === 'string' && payload.city.length > 0) return payload.city
  if (typeof payload.locality === 'string' && payload.locality.length > 0) return payload.locality
  return undefined
}

/**
 * Query one IP location service for the current egress location.
 * @param url - the IP lookup endpoint.
 * @returns the reported city plus coordinates, or undefined when the service
 * answers without usable coordinates.
 */
async function ipLocation(url: string): Promise<WeatherLocation | undefined> {
  const payload = await requestJson<{
    city?: unknown
    latitude?: unknown
    longitude?: unknown
    lat?: unknown
    lon?: unknown
  }>(url)
  const latitude = typeof payload.latitude === 'number' ? payload.latitude
    : typeof payload.lat === 'number' ? payload.lat : undefined
  const longitude = typeof payload.longitude === 'number' ? payload.longitude
    : typeof payload.lon === 'number' ? payload.lon : undefined
  if (latitude === undefined || longitude === undefined) return undefined
  return {
    latitude,
    longitude,
    ...(typeof payload.city === 'string' && payload.city.length > 0 ? { name: payload.city } : {}),
  }
}

/** Resolve the geolocation API's current position, rejecting on denial/timeout. */
function browserCoords(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    const geolocation = navigator.geolocation
    geolocation.getCurrentPosition(
      (position) => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      },
      (error) => { reject(new Error(error.message)) },
      { enableHighAccuracy: true, timeout: GEOLOCATION_TIMEOUT_MS, maximumAge: 60_000 },
    )
  })
}

/** GET one URL and decode its JSON body, rejecting on transport/HTTP errors. */
async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new WeatherApiError(`weather request failed with HTTP ${response.status}`)
  }
  return await response.json() as T
}
