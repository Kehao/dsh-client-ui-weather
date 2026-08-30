/**
 * ui-weather WMO code mapping: every dictionary key is reachable from the
 * WMO code groups, and unknown codes fall back to the overcast label.
 */
import { describe, expect, it } from 'vitest'
import { weatherCodeKey } from '../src/client/weather-code.ts'
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
