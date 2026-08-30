// @vitest-environment jsdom
/**
 * WeatherBackdrop: renders the SMIL-animated Meteocons SVG keyed by state,
 * is decorative (aria-hidden), never intercepts pointer events, and the art
 * table covers every backdrop state.
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { WeatherBackdrop } from '../src/client/WeatherBackdrop.tsx'
import { WEATHER_ART } from '../src/client/weather-art.ts'

describe('WeatherBackdrop', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    const proto = SVGElement.prototype as unknown as Record<string, unknown>
    delete proto.pauseAnimations
    delete proto.unpauseAnimations
  })

  it('renders an svg for the given state', () => {
    const { container } = render(<WeatherBackdrop state="rain" />)
    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    // The rain art contains the falling-drop SMIL animation.
    expect(svg?.innerHTML).toContain('animateTransform')
  })

  it('is decorative and inert', () => {
    const { container } = render(<WeatherBackdrop state="sunny" />)
    const backdrop = container.firstElementChild
    expect(backdrop?.getAttribute('aria-hidden')).toBe('true')
  })

  it('every backdrop state has art', () => {
    for (const state of ['sunny', 'partlyCloudy', 'cloudy', 'fog', 'drizzle', 'freezingDrizzle', 'rain', 'freezingRain', 'snow', 'hail', 'storm'] as const) {
      expect(WEATHER_ART[state]).toContain('<svg')
    }
  })

  it('pauses SMIL animations under prefers-reduced-motion', () => {
    const pause = vi.fn()
    const unpause = vi.fn()
    const proto = SVGElement.prototype as unknown as Record<string, unknown>
    proto.pauseAnimations = pause
    proto.unpauseAnimations = unpause
    const mql = {
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    render(<WeatherBackdrop state="rain" />)
    expect(pause).toHaveBeenCalled()
    expect(unpause).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })

  it('plays SMIL animations when motion is allowed', () => {
    const pause = vi.fn()
    const unpause = vi.fn()
    const proto = SVGElement.prototype as unknown as Record<string, unknown>
    proto.pauseAnimations = pause
    proto.unpauseAnimations = unpause
    const mql = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList
    vi.stubGlobal('matchMedia', vi.fn(() => mql))
    render(<WeatherBackdrop state="rain" />)
    expect(unpause).toHaveBeenCalled()
    expect(pause).not.toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
