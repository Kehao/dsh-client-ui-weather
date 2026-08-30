import type { WeatherBackdrop } from './weather-code.ts';
/** Props for the animated weather backdrop. */
export interface WeatherBackdropProps {
    /** Backdrop animation state derived from the WMO code. */
    state: WeatherBackdrop;
}
/**
 * Animated weather backdrop behind the card content. Pure CSS, no canvas or
 * WebGL: rain streaks and snowflakes fall through repeating background
 * gradients, a clear sky shows a rotating sun with light rays, and a storm
 * adds a periodic lightning flash. Layers are decorative (aria-hidden) and
 * never intercept pointer events; the reduced-motion media query freezes all
 * animation.
 */
export declare function WeatherBackdrop({ state }: WeatherBackdropProps): import("react").JSX.Element;
