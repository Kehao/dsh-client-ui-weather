import type { WeatherBackdrop } from './weather-code.ts'
import css from './WeatherBackdrop.module.css'

/** Props for the animated weather backdrop. */
export interface WeatherBackdropProps {
  /** Backdrop animation state derived from the WMO code. */
  state: WeatherBackdrop
}

/**
 * Animated weather backdrop behind the card content. Pure CSS, no canvas or
 * WebGL: rain streaks and snowflakes fall through repeating background
 * gradients, a clear sky shows a rotating sun with light rays, and a storm
 * adds a periodic lightning flash. Layers are decorative (aria-hidden) and
 * never intercept pointer events; the reduced-motion media query freezes all
 * animation.
 */
export function WeatherBackdrop({ state }: WeatherBackdropProps) {
  return (
    <div className={css.backdrop} data-state={state} aria-hidden="true">
      <div className={css.sun}>
        <div className={css.sunCore} />
        <div className={css.sunRays} />
      </div>
      <div className={css.clouds}>
        <div className={css.cloud} />
        <div className={css.cloud} />
        <div className={css.cloud} />
      </div>
      <div className={css.precipitation} />
      <div className={css.lightning} />
    </div>
  )
}
