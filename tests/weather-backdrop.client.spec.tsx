// @vitest-environment jsdom
/**
 * WeatherBackdrop: renders the decorative layers keyed by data-state, is
 * aria-hidden and pointer-transparent, and exposes the animation state the
 * card content stacks above.
 */
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { WeatherBackdrop } from '../src/client/WeatherBackdrop.tsx'

afterEach(cleanup)

describe('WeatherBackdrop', () => {
  it('renders the backdrop with the given data-state', () => {
    const { container } = render(<WeatherBackdrop state="rain" />)
    const backdrop = container.querySelector('[data-state="rain"]')
    expect(backdrop).toBeTruthy()
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<WeatherBackdrop state="sunny" />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
  })

  it('renders all decorative layers for every state', () => {
    for (const state of ['sunny', 'cloudy', 'rain', 'snow', 'storm'] as const) {
      const { container } = render(<WeatherBackdrop state={state} />)
      // sun, clouds, precipitation, lightning layers always exist; the state
      // class selects which are visible.
      expect(container.querySelectorAll('div').length).toBeGreaterThanOrEqual(6)
    }
  })
})
