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
    readonly latitude: number;
    /** WGS84 longitude in degrees. */
    readonly longitude: number;
    /** Best available place name (city, or a localized fallback when unknown). */
    readonly name?: string;
}
/** Current conditions as returned by the Open-Meteo forecast API. */
export interface CurrentWeather {
    /** Air temperature at 2 m, °C. */
    readonly temperature: number;
    /** Apparent (feels-like) temperature, °C. */
    readonly apparentTemperature: number;
    /** Relative humidity at 2 m, %. */
    readonly humidity: number;
    /** Wind speed at 10 m, km/h. */
    readonly windSpeed: number;
    /** WMO weather interpretation code. */
    readonly weatherCode: number;
    /** ISO 8601 time of the observation, local to the location. */
    readonly time: string;
}
/** One Open-Meteo geocoding hit for the manual city search. */
export interface CityResult {
    /** Stable geocoding entry id. */
    readonly id: number;
    /** City or settlement name. */
    readonly name: string;
    /** First-level administrative division, when reported. */
    readonly admin1?: string;
    /** Country name, when reported. */
    readonly country?: string;
    /** WGS84 latitude in degrees. */
    readonly latitude: number;
    /** WGS84 longitude in degrees. */
    readonly longitude: number;
}
/** Thrown when automatic location resolution (geolocation + IP fallbacks) fails. */
export declare class LocationUnavailableError extends Error {
}
/** Thrown when the weather or geocoding API request fails. */
export declare class WeatherApiError extends Error {
}
/** Shortcut cities offered in the search popup so users can switch without typing. */
export declare const POPULAR_CITIES: readonly CityResult[];
/**
 * Fetch current conditions for a coordinate pair from Open-Meteo.
 * @param latitude - WGS84 latitude in degrees.
 * @param longitude - WGS84 longitude in degrees.
 * @returns parsed current conditions.
 * @throws {WeatherApiError} when the request fails or the payload is unusable.
 */
export declare function fetchCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather>;
/**
 * Search settlements by name through Open-Meteo geocoding.
 * @param query - free-form city/settlement query.
 * @returns up to five matching settlements.
 * @throws {WeatherApiError} when the request fails or returns a non-list payload.
 */
export declare function searchCity(query: string): Promise<CityResult[]>;
/**
 * Resolve the browser's location: ask the geolocation API first (the most
 * precise "local"), then fall back to IP lookups, then give up.
 * @returns coordinates plus the best-known place name.
 * @throws {LocationUnavailableError} when every source fails or is denied.
 */
export declare function resolveLocation(): Promise<WeatherLocation>;
/**
 * Reverse-geocode a coordinate pair into a place name via BigDataCloud.
 * @param latitude - WGS84 latitude in degrees.
 * @param longitude - WGS84 longitude in degrees.
 * @returns the best locality name, or undefined when the API does not report one.
 */
export declare function reverseGeocode(latitude: number, longitude: number): Promise<string | undefined>;
