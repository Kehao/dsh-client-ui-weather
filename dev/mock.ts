/**
 * Playground mock data: stubbed location and weather inputs for the
 * standalone UI. Lets the developer flip between scenarios (sunny Beijing,
 * rainy Shanghai, location error, weather error) without a real network or
 * geolocation prompt.
 */
import type {
  CityResult, CurrentWeather, WeatherLocation,
} from '../src/client/weather-api.ts'

export interface WeatherScenario {
  readonly id: string
  readonly label: string
  /** Resolved location passed to the widget's inject face. */
  readonly location: WeatherLocation
  /** Current conditions returned by the fetch stub. */
  readonly weather: CurrentWeather
}

export const SUNNY_BEIJING: WeatherScenario = {
  id: 'sunny-beijing',
  label: '☀️ 晴 · 北京',
  location: { latitude: 39.9, longitude: 116.4, name: '北京市' },
  weather: {
    temperature: 23.1,
    apparentTemperature: 25.2,
    humidity: 68,
    windSpeed: 2.1,
    weatherCode: 0,
    time: '2026-08-30T22:30',
  },
}

export const RAINY_SHANGHAI: WeatherScenario = {
  id: 'rainy-shanghai',
  label: '🌧️ 雨 · 上海',
  location: { latitude: 31.23, longitude: 121.47, name: '上海市' },
  weather: {
    temperature: 18.4,
    apparentTemperature: 17.9,
    humidity: 92,
    windSpeed: 14.7,
    weatherCode: 63,
    time: '2026-08-30T22:00',
  },
}

export const COLD_HARBIN: WeatherScenario = {
  id: 'cold-harbin',
  label: '❄️ 雪 · 哈尔滨',
  location: { latitude: 45.8, longitude: 126.5, name: '哈尔滨市' },
  weather: {
    temperature: -8.6,
    apparentTemperature: -14.2,
    humidity: 81,
    windSpeed: 18.3,
    weatherCode: 73,
    time: '2026-08-30T23:00',
  },
}

export const STORMY_SHENZHEN: WeatherScenario = {
  id: 'stormy-shenzhen',
  label: '⛈️ 雷暴 · 深圳',
  location: { latitude: 22.54, longitude: 114.06, name: '深圳市' },
  weather: {
    temperature: 27.3,
    apparentTemperature: 31.5,
    humidity: 88,
    windSpeed: 22.6,
    weatherCode: 95,
    time: '2026-08-31T00:30',
  },
}

export const PARTLY_CLOUDY_HANGZHOU: WeatherScenario = {
  id: 'partly-cloudy-hangzhou',
  label: '🌤️ 局部多云 · 杭州',
  location: { latitude: 30.27, longitude: 120.15, name: '杭州市' },
  weather: {
    temperature: 24.5,
    apparentTemperature: 25.8,
    humidity: 62,
    windSpeed: 4.2,
    weatherCode: 1,
    time: '2026-08-31T01:00',
  },
}

export const CLOUDY_CHENGDU: WeatherScenario = {
  id: 'cloudy-chengdu',
  label: '☁️ 多云 · 成都',
  location: { latitude: 30.57, longitude: 104.06, name: '成都市' },
  weather: {
    temperature: 21.0,
    apparentTemperature: 21.5,
    humidity: 74,
    windSpeed: 3.1,
    weatherCode: 3,
    time: '2026-08-31T01:00',
  },
}

export const FOGGY_CHONGQING: WeatherScenario = {
  id: 'foggy-chongqing',
  label: '🌫️ 雾 · 重庆',
  location: { latitude: 29.56, longitude: 106.55, name: '重庆市' },
  weather: {
    temperature: 16.2,
    apparentTemperature: 16.0,
    humidity: 95,
    windSpeed: 1.2,
    weatherCode: 45,
    time: '2026-08-31T01:00',
  },
}

export const DRIZZLY_NANJING: WeatherScenario = {
  id: 'drizzly-nanjing',
  label: '🌦️ 毛毛雨 · 南京',
  location: { latitude: 32.06, longitude: 118.78, name: '南京市' },
  weather: {
    temperature: 17.8,
    apparentTemperature: 18.2,
    humidity: 89,
    windSpeed: 5.4,
    weatherCode: 53,
    time: '2026-08-31T01:00',
  },
}

export const FREEZING_DRIZZLE_HOHHOT: WeatherScenario = {
  id: 'freezing-drizzle-hohhot',
  label: '🌧️❄️ 冻毛毛雨 · 呼和浩特',
  location: { latitude: 40.84, longitude: 111.75, name: '呼和浩特市' },
  weather: {
    temperature: -1.3,
    apparentTemperature: -5.1,
    humidity: 86,
    windSpeed: 11.8,
    weatherCode: 56,
    time: '2026-08-31T01:00',
  },
}

export const FREEZING_RAIN_CHANGCHUN: WeatherScenario = {
  id: 'freezing-rain-changchun',
  label: '🌧️🧊 冻雨 · 长春',
  location: { latitude: 43.82, longitude: 125.32, name: '长春市' },
  weather: {
    temperature: -2.5,
    apparentTemperature: -7.2,
    humidity: 90,
    windSpeed: 14.5,
    weatherCode: 66,
    time: '2026-08-31T01:00',
  },
}

export const HAIL_GUIYANG: WeatherScenario = {
  id: 'hail-guiyang',
  label: '🧊 冰雹 · 贵阳',
  location: { latitude: 26.65, longitude: 106.63, name: '贵阳市' },
  weather: {
    temperature: 14.6,
    apparentTemperature: 13.9,
    humidity: 91,
    windSpeed: 19.3,
    weatherCode: 96,
    time: '2026-08-31T01:00',
  },
}

export const ALL_SCENARIOS: readonly WeatherScenario[] = [
  SUNNY_BEIJING,
  PARTLY_CLOUDY_HANGZHOU,
  CLOUDY_CHENGDU,
  FOGGY_CHONGQING,
  DRIZZLY_NANJING,
  RAINY_SHANGHAI,
  FREEZING_DRIZZLE_HOHHOT,
  FREEZING_RAIN_CHANGCHUN,
  COLD_HARBIN,
  HAIL_GUIYANG,
  STORMY_SHENZHEN,
]

/** City search stub mirroring the Open-Meteo geocoding result shape. */
export const SEARCH_CITIES: readonly CityResult[] = [
  { id: 1, name: '北京市', admin1: '北京', country: '中国', latitude: 39.9, longitude: 116.4 },
  { id: 2, name: '上海市', admin1: '上海', country: '中国', latitude: 31.23, longitude: 121.47 },
  { id: 3, name: '哈尔滨市', admin1: '黑龙江', country: '中国', latitude: 45.8, longitude: 126.5 },
]

/** Delay stub resolve so the loading state is visible while debugging. */
export function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => { resolve(value) }, ms)
  })
}

/** Reject after a delay so the error state is visible while debugging. */
export function delayReject(ms = 400): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => { reject(new Error('stubbed failure')) }, ms)
  })
}

/** A stub factory for the inject face the widget receives. */
export function buildStubInjected(scenario: WeatherScenario) {
  return {
    resolveLocation: () => delay(scenario.location),
    fetchWeather: () => delay(scenario.weather),
    searchCity: (query: string) =>
      delay(SEARCH_CITIES.filter(city => city.name.includes(query))),
  }
}

/** Locale stub mirroring the widget's `t` seat over the real dictionaries. */
export function makeLocaleStub(zhDict: Record<string, string>, enDict: Record<string, string>) {
  let language: 'zh' | 'en' = 'zh'
  const setLanguage = (next: 'zh' | 'en'): void => { language = next }
  const t = (key: string, params?: Record<string, unknown>): string => {
    const dict = language === 'zh' ? zhDict : enDict
    let template = dict[key] ?? key
    if (params !== undefined) {
      template = template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in params ? String(params[name]) : match)
    }
    return template
  }
  return { t, setLanguage }
}
