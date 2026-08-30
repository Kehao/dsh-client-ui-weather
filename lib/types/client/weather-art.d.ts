/**
 * Weather art: hand-crafted animated SVG icons from
 * Meteocons (https://github.com/basmilius/meteocons, MIT).
 * Animations are inline SMIL (<animate>/<animateTransform>), so the
 * backdrop animates with zero JS or CSS keyframes. Icons are 128x128.
 * Freezing-drizzle and freezing-rain reuse the sleet art.
 */
import type { WeatherBackdrop } from './weather-code.ts';
export declare const WEATHER_ART: Record<WeatherBackdrop, string>;
