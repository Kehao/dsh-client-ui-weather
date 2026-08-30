/** `weather` namespace dictionaries. */
/** Dictionary namespace owned by this plugin. */
export declare const NS = "weather";
/** Simplified Chinese dictionary (the key-set source of truth). */
export declare const zh: {
    locating: string;
    'location.unknown': string;
    'error.location': string;
    'error.weather': string;
    refresh: string;
    'search.placeholder': string;
    'search.empty': string;
    feelsLike: string;
    humidity: string;
    wind: string;
    'code.clear': string;
    'code.mainlyClear': string;
    'code.partlyCloudy': string;
    'code.overcast': string;
    'code.fog': string;
    'code.drizzle': string;
    'code.freezingDrizzle': string;
    'code.rain': string;
    'code.freezingRain': string;
    'code.snow': string;
    'code.snowGrains': string;
    'code.rainShowers': string;
    'code.snowShowers': string;
    'code.thunderstorm': string;
    'code.thunderstormHail': string;
};
/** Union of this namespace's dictionary keys. */
export type WeatherKey = keyof typeof zh;
/** English dictionary (same key set). */
export declare const en: Record<WeatherKey, string>;
