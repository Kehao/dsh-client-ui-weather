/**
 * ui-weather data layer: the Open-Meteo/BigDataCloud fetchers and the
 * geolocation → IP fallback chain, driven with a stubbed global fetch and
 * geolocation. Node environment (no jsdom), like the other data-layer specs.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  LocationUnavailableError, WeatherApiError, fetchCurrentWeather, resolveLocation,
  reverseGeocode, searchCity,
} from '../src/client/weather-api.ts'

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status, headers: { 'content-type': 'application/json' } })
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('fetchCurrentWeather', () => {
  it('parses current conditions from an Open-Meteo payload', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({
      current: {
        time: '2026-08-30T22:30',
        temperature_2m: 23.1,
        apparent_temperature: 25.2,
        relative_humidity_2m: 68,
        weather_code: 2,
        wind_speed_10m: 2.1,
      },
    }))
    vi.stubGlobal('fetch', fetchMock)

    const weather = await fetchCurrentWeather(39.9, 116.4)
    expect(weather).toEqual({
      temperature: 23.1,
      apparentTemperature: 25.2,
      humidity: 68,
      windSpeed: 2.1,
      weatherCode: 2,
      time: '2026-08-30T22:30',
    })
    const url = String(fetchMock.mock.calls[0]?.[0])
    expect(url).toContain('api.open-meteo.com/v1/forecast')
    expect(url).toContain('latitude=39.9')
    expect(url).toContain('longitude=116.4')
  })

  it('rejects an HTTP error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 503)))
    await expect(fetchCurrentWeather(0, 0)).rejects.toBeInstanceOf(WeatherApiError)
  })

  it('rejects a payload without current conditions', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ current: { temperature_2m: 'warm' } })))
    await expect(fetchCurrentWeather(0, 0)).rejects.toBeInstanceOf(WeatherApiError)
  })
})

describe('searchCity', () => {
  it('returns settlements from the geocoding payload', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({
      results: [
        { id: 1816670, name: 'Beijing', admin1: 'Beijing Municipality', country: 'China', latitude: 39.9075, longitude: 116.39723 },
        { id: 999, name: 'broken' },
      ],
    })))
    const cities = await searchCity('Beijing')
    expect(cities).toEqual([
      {
        id: 1816670, name: 'Beijing', admin1: 'Beijing Municipality', country: 'China',
        latitude: 39.9075, longitude: 116.39723,
      },
    ])
  })

  it('returns an empty list when the payload has no results', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ results: 'nope' })))
    expect(await searchCity('Atlantis')).toEqual([])
  })

  it('propagates HTTP failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 429)))
    await expect(searchCity('Beijing')).rejects.toBeInstanceOf(WeatherApiError)
  })
})

describe('reverseGeocode', () => {
  it('returns the city from BigDataCloud', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ city: '北京市' })))
    expect(await reverseGeocode(39.9, 116.4)).toBe('北京市')
  })

  it('falls back to the locality when no city is reported', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ locality: '東城區' })))
    expect(await reverseGeocode(39.9, 116.4)).toBe('東城區')
  })

  it('returns undefined when neither field is present', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ countryName: 'China' })))
    expect(await reverseGeocode(39.9, 116.4)).toBeUndefined()
  })
})

describe('resolveLocation', () => {
  it('uses browser geolocation and reverse-geocodes the name', async () => {
    const geolocation = {
      getCurrentPosition: (ok: (p: { coords: { latitude: number; longitude: number } }) => void) => {
        ok({ coords: { latitude: 31.23, longitude: 121.47 } })
      },
    }
    vi.stubGlobal('navigator', { geolocation })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ city: '上海市' })))

    expect(await resolveLocation()).toEqual({ latitude: 31.23, longitude: 121.47, name: '上海市' })
    // Only the reverse-geocode request ran; no IP lookup was needed.
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1)
  })

  it('keeps the coordinates when reverse geocoding fails', async () => {
    const geolocation = {
      getCurrentPosition: (ok: (p: { coords: { latitude: number; longitude: number } }) => void) => {
        ok({ coords: { latitude: 1, longitude: 2 } })
      },
    }
    vi.stubGlobal('navigator', { geolocation })
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    expect(await resolveLocation()).toEqual({ latitude: 1, longitude: 2, name: undefined })
  })

  it('falls back to the first IP source when geolocation is unavailable', async () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({
      city: 'Tokyo', latitude: 35.6895, longitude: 139.6917,
    })))

    expect(await resolveLocation()).toEqual({ latitude: 35.6895, longitude: 139.6917, name: 'Tokyo' })
  })

  it('falls back to the second IP source when the first fails', async () => {
    vi.stubGlobal('navigator', {})
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ error: true }, 429))
      .mockResolvedValueOnce(jsonResponse({ city: 'Osaka', lat: 34.6937, lon: 135.5023 }))
    vi.stubGlobal('fetch', fetchMock)

    expect(await resolveLocation()).toEqual({ latitude: 34.6937, longitude: 135.5023, name: 'Osaka' })
  })

  it('throws LocationUnavailableError when every source fails', async () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 500)))
    await expect(resolveLocation()).rejects.toBeInstanceOf(LocationUnavailableError)
  })

  it('throws LocationUnavailableError when IP sources answer without coordinates', async () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ city: 'Nowhere' })))
    await expect(resolveLocation()).rejects.toBeInstanceOf(LocationUnavailableError)
  })

  it('falls through to IP when geolocation denies permission', async () => {
    const geolocation = {
      getCurrentPosition: (_ok: unknown, fail: (e: Error) => void) => { fail(new Error('denied')) },
    }
    vi.stubGlobal('navigator', { geolocation })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({
      city: 'Shanghai', latitude: 31.23, longitude: 121.47,
    })))

    expect(await resolveLocation()).toEqual({ latitude: 31.23, longitude: 121.47, name: 'Shanghai' })
  })
})
