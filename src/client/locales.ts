/** `weather` namespace dictionaries. */

/** Dictionary namespace owned by this plugin. */
export const NS = 'weather'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'locating': '正在定位…',
  'location.unknown': '未知位置',
  'error.location': '无法获取位置',
  'error.weather': '天气获取失败',
  'refresh': '刷新',
  'search.placeholder': '搜索城市',
  'search.empty': '未找到匹配的城市',
  'feelsLike': '体感 {temp}°',
  'humidity': '湿度 {value}%',
  'wind': '风速 {value} km/h',
  'code.clear': '☀️ 晴',
  'code.mainlyClear': '🌤️ 大部晴朗',
  'code.partlyCloudy': '⛅ 局部多云',
  'code.overcast': '☁️ 阴',
  'code.fog': '🌫️ 雾',
  'code.drizzle': '🌦️ 毛毛雨',
  'code.freezingDrizzle': '🌧️ 冻毛毛雨',
  'code.rain': '🌧️ 雨',
  'code.freezingRain': '🌧️ 冻雨',
  'code.snow': '❄️ 雪',
  'code.snowGrains': '❄️ 雪粒',
  'code.rainShowers': '🌦️ 阵雨',
  'code.snowShowers': '🌨️ 阵雪',
  'code.thunderstorm': '⛈️ 雷暴',
  'code.thunderstormHail': '⛈️ 雷暴伴冰雹',
}

/** Union of this namespace's dictionary keys. */
export type WeatherKey = keyof typeof zh

/** English dictionary (same key set). */
export const en: Record<WeatherKey, string> = {
  'locating': 'Locating…',
  'location.unknown': 'Unknown location',
  'error.location': 'Location unavailable',
  'error.weather': 'Weather unavailable',
  'refresh': 'Refresh',
  'search.placeholder': 'Search city',
  'search.empty': 'No matching city',
  'feelsLike': 'Feels like {temp}°',
  'humidity': 'Humidity {value}%',
  'wind': 'Wind {value} km/h',
  'code.clear': '☀️ Clear',
  'code.mainlyClear': '🌤️ Mainly clear',
  'code.partlyCloudy': '⛅ Partly cloudy',
  'code.overcast': '☁️ Overcast',
  'code.fog': '🌫️ Fog',
  'code.drizzle': '🌦️ Drizzle',
  'code.freezingDrizzle': '🌧️ Freezing drizzle',
  'code.rain': '🌧️ Rain',
  'code.freezingRain': '🌧️ Freezing rain',
  'code.snow': '❄️ Snow',
  'code.snowGrains': '❄️ Snow grains',
  'code.rainShowers': '🌦️ Rain showers',
  'code.snowShowers': '🌨️ Snow showers',
  'code.thunderstorm': '⛈️ Thunderstorm',
  'code.thunderstormHail': '⛈️ Thunderstorm with hail',
}
