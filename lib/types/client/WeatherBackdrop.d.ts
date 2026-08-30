import type { WeatherBackdrop } from './weather-code.ts';
/** Props for the animated weather backdrop. */
export interface WeatherBackdropProps {
    /** Backdrop state derived from the WMO code. */
    state: WeatherBackdrop;
}
/**
 * Animated weather backdrop behind the card content. The art is an inline
 * SMIL-animated SVG (from Meteocons), so it animates with zero JS: the sun
 * rays rotate, clouds drift, raindrops and snowflakes fall, and the storm
 * bolt flashes. Injected via dangerouslySetInnerHTML because the markup is a
 * trusted, build-time constant from this package. Decorative (aria-hidden)
 * and never intercepts pointer events. Under prefers-reduced-motion the SMIL
 * timeline is paused via the native SVG pauseAnimations() API.
 */
export declare function WeatherBackdrop({ state }: WeatherBackdropProps): import("react").JSX.Element;
