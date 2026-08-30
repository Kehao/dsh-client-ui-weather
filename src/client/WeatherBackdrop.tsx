import { useEffect, useRef } from 'react'
import type { WeatherBackdrop } from './weather-code.ts'
import { WEATHER_ART } from './weather-art.ts'
import css from './WeatherBackdrop.module.css'

/** Props for the animated weather backdrop. */
export interface WeatherBackdropProps {
  /** Backdrop state derived from the WMO code. */
  state: WeatherBackdrop
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
export function WeatherBackdrop({ state }: WeatherBackdropProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svg = hostRef.current?.querySelector('svg')
    if (!svg) return
    const reduce = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
    if (reduce) {
      svg.pauseAnimations?.()
    } else {
      svg.unpauseAnimations?.()
    }
  }, [state])

  return (
    <div
      ref={hostRef}
      className={css.backdrop}
      data-state={state}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: WEATHER_ART[state] }}
    />
  )
}
