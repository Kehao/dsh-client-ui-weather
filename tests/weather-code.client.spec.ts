/**
 * ui-weather WMO code mapping: every dictionary key is reachable from the
 * WMO code groups, unknown codes fall back to the overcast label, and each
 * code group maps to its backdrop state.
 */
import { describe, expect, it } from 'vitest'
import { weatherBackdrop, weatherCodeKey } from '../src/client/weather-code.ts'
import { zh } from '../src/client/locales.ts'

describe('weatherCodeKey', () => {
  it('maps the clear-sky group', () => {
    expect(weatherCodeKey(0)).toBe('code.clear')
    expect(weatherCodeKey(1)).toBe('code.mainlyClear')
    expect(weatherCodeKey(2)).toBe('code.partlyCloudy')
    expect(weatherCodeKey(3)).toBe('code.overcast')
  })

  it('maps fog', () => {
    expect(weatherCodeKey(45)).toBe('code.fog')
    expect(weatherCodeKey(48)).toBe('code.fog')
  })

  it('maps drizzle and freezing drizzle', () => {
    for (const code of [51, 53, 55]) expect(weatherCodeKey(code)).toBe('code.drizzle')
    for (const code of [56, 57]) expect(weatherCodeKey(code)).toBe('code.freezingDrizzle')
  })

  it('maps rain and freezing rain', () => {
    for (const code of [61, 63, 65]) expect(weatherCodeKey(code)).toBe('code.rain')
    for (const code of [66, 67]) expect(weatherCodeKey(code)).toBe('code.freezingRain')
  })

  it('maps snow and snow grains', () => {
    for (const code of [71, 73, 75]) expect(weatherCodeKey(code)).toBe('code.snow')
    expect(weatherCodeKey(77)).toBe('code.snowGrains')
  })

  it('maps showers', () => {
    for (const code of [80, 81, 82]) expect(weatherCodeKey(code)).toBe('code.rainShowers')
    for (const code of [85, 86]) expect(weatherCodeKey(code)).toBe('code.snowShowers')
  })

  it('maps thunderstorms', () => {
    expect(weatherCodeKey(95)).toBe('code.thunderstorm')
    for (const code of [96, 99]) expect(weatherCodeKey(code)).toBe('code.thunderstormHail')
  })

  it('falls back to overcast for unknown codes', () => {
    expect(weatherCodeKey(-1)).toBe('code.overcast')
    expect(weatherCodeKey(100)).toBe('code.overcast')
  })

  it('every reachable key exists in the dictionaries', () => {
    const reachable = new Set([0, 1, 2, 3, 45, 48, 51, 56, 61, 66, 71, 77, 80, 85, 95, 96, 99, -1]
      .map(weatherCodeKey))
    for (const key of reachable) {
      expect(zh[key]).toBeTypeOf('string')
    }
  })
})

describe('weatherBackdrop', () => {
  it('maps the clear-sky code to sunny', () => {
    expect(weatherBackdrop(0)).toBe('sunny')
  })

  it('maps partly cloudy codes to partlyCloudy', () => {
    for (const code of [1, 2]) expect(weatherBackdrop(code)).toBe('partlyCloudy')
  })

  it('maps overcast to cloudy', () => {
    expect(weatherBackdrop(3)).toBe('cloudy')
  })

  it('maps fog to fog', () => {
    for (const code of [45, 48]) expect(weatherBackdrop(code)).toBe('fog')
  })

  it('maps drizzle to drizzle', () => {
    for (const code of [51, 53, 55]) expect(weatherBackdrop(code)).toBe('drizzle')
  })

  it('maps freezing drizzle to freezingDrizzle', () => {
    for (const code of [56, 57]) expect(weatherBackdrop(code)).toBe('freezingDrizzle')
  })

  it('maps rain to rain', () => {
    for (const code of [61, 63, 65, 80, 81, 82]) expect(weatherBackdrop(code)).toBe('rain')
  })

  it('maps freezing rain to freezingRain', () => {
    for (const code of [66, 67]) expect(weatherBackdrop(code)).toBe('freezingRain')
  })

  it('maps snow to snow', () => {
    for (const code of [71, 73, 75, 77, 85, 86]) expect(weatherBackdrop(code)).toBe('snow')
  })

  it('maps thunderstorms to storm', () => {
    expect(weatherBackdrop(95)).toBe('storm')
  })

  it('maps thunderstorms with hail to hail', () => {
    for (const code of [96, 99]) expect(weatherBackdrop(code)).toBe('hail')
  })

  it('falls back to cloudy for unknown codes', () => {
    expect(weatherBackdrop(-1)).toBe('cloudy')
    expect(weatherBackdrop(100)).toBe('cloudy')
  })
})
