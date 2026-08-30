import { useCallback, useEffect, useState } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { CurrentWeather, CityResult, WeatherLocation } from './weather-api.ts'
import { weatherCodeKey } from './weather-code.ts'
import type { WeatherKey } from './locales.ts'
import css from './WeatherWidget.module.css'

/** The inject face: browser-side data access, kept out of the component. */
export interface WeatherInjected {
  /** Resolve the local coordinates (geolocation, then IP fallback). */
  resolveLocation: () => Promise<WeatherLocation>
  /** Fetch current conditions for a coordinate pair. */
  fetchWeather: (location: WeatherLocation) => Promise<CurrentWeather>
  /** Search settlements by name for the manual city override. */
  searchCity: (query: string) => Promise<CityResult[]>
}

type LoadState =
  | { status: 'locating' }
  | { status: 'ready'; location: WeatherLocation; weather: CurrentWeather }
  | { status: 'error'; message: WeatherKey }

/** Full component props: sidebar owner input plus the injected data access. */
export type WeatherWidgetProps =
  & PropsRuntime<'sidebar.footer.action'>
  & WeatherInjected
  & PropsLocale<'weather'>

/**
 * Sidebar-foot weather card: auto-locates the browser (geolocation, then IP),
 * shows current conditions, and lets the user search a city to override the
 * location. Collapsed to a temperature pill on the rail.
 */
export function WeatherWidget({ wide, t, resolveLocation, fetchWeather, searchCity }: WeatherWidgetProps) {
  const [state, setState] = useState<LoadState>({ status: 'locating' })
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState<CityResult[]>([])
  const [searching, setSearching] = useState(false)

  // The injected callbacks are stable for the entry lifetime; run the
  // auto-locate chain once on mount and on every explicit refresh.
  const autoLocate = useCallback(async (): Promise<void> => {
    setState({ status: 'locating' })
    let location: WeatherLocation
    try {
      location = await resolveLocation()
    } catch {
      setState({ status: 'error', message: 'error.location' })
      return
    }
    try {
      const weather = await fetchWeather(location)
      setState({ status: 'ready', location, weather })
    } catch {
      setState({ status: 'error', message: 'error.weather' })
    }
  }, [resolveLocation, fetchWeather])

  useEffect(() => { void autoLocate() }, [autoLocate])

  const selectCity = async (city: CityResult): Promise<void> => {
    setQuery('')
    setMatches([])
    setState({ status: 'locating' })
    try {
      const location = { latitude: city.latitude, longitude: city.longitude, name: city.name }
      const weather = await fetchWeather(location)
      setState({ status: 'ready', location, weather })
    } catch {
      setState({ status: 'error', message: 'error.weather' })
    }
  }

  const runSearch = async (): Promise<void> => {
    const term = query.trim()
    if (term.length === 0) return
    setSearching(true)
    try {
      setMatches(await searchCity(term))
    } catch {
      setMatches([])
    } finally {
      setSearching(false)
    }
  }

  const ready = state.status === 'ready'
  const temperature = ready ? Math.round(state.weather.temperature) : undefined
  const description = ready ? t(weatherCodeKey(state.weather.weatherCode)) : undefined
  const place = ready ? (state.location.name ?? t('location.unknown')) : undefined
  const summary = ready
    ? `${place} ${temperature}° ${description}`
    : t('locating')

  if (!wide) {
    return (
      <button
        type="button"
        className={css.rail}
        aria-label={summary}
        title={summary}
        onClick={() => { void autoLocate() }}
      >
        {temperature !== undefined ? `${temperature}°` : '—'}
      </button>
    )
  }

  return (
    <div className={css.card}>
      <div className={css.head}>
        <span className={css.place}>{ready ? place : t('locating')}</span>
        <button
          type="button"
          className={css.refresh}
          aria-label={t('refresh')}
          title={t('refresh')}
          onClick={() => { void autoLocate() }}
        >
          ↻
        </button>
      </div>

      {ready && (
        <>
          <div className={css.main}>
            <span className={css.temp}>{temperature}°</span>
            <span className={css.desc}>{description}</span>
          </div>
          <div className={css.details}>
            <span>{t('feelsLike', { temp: Math.round(state.weather.apparentTemperature) })}</span>
            <span>{t('humidity', { value: state.weather.humidity })}</span>
            <span>{t('wind', { value: Math.round(state.weather.windSpeed) })}</span>
          </div>
        </>
      )}

      {state.status === 'error' && (
        <div className={css.error} role="alert">
          <span>{t(state.message)}</span>
          <button type="button" className={css.retry} onClick={() => { void autoLocate() }}>
            {t('refresh')}
          </button>
        </div>
      )}

      <div className={css.search}>
        <input
          className={css.searchInput}
          value={query}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          onChange={(event) => { setQuery(event.target.value); setMatches([]) }}
          onKeyDown={(event) => { if (event.key === 'Enter') void runSearch() }}
        />
        {searching && <span className={css.searching}>{t('locating')}</span>}
        {!searching && matches.length > 0 && (
          <ul className={css.matches}>
            {matches.map(city => (
              <li key={city.id}>
                <button
                  type="button"
                  className={css.match}
                  onClick={() => { void selectCity(city) }}
                >
                  {city.name}{city.admin1 !== undefined ? ` · ${city.admin1}` : ''}
                  {city.country !== undefined ? ` · ${city.country}` : ''}
                </button>
              </li>
            ))}
          </ul>
        )}
        {!searching && matches.length === 0 && query.trim().length > 0 && (
          <div className={css.noMatches}>{t('search.empty')}</div>
        )}
      </div>
    </div>
  )
}
