import { useCallback, useEffect, useRef, useState } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { CurrentWeather, CityResult, WeatherLocation } from './weather-api.ts'
import { POPULAR_CITIES } from './weather-api.ts'
import { weatherBackdrop, weatherCodeKey } from './weather-code.ts'
import type { WeatherKey } from './locales.ts'
import { RefreshIcon, WarningIcon } from './icons.tsx'
import { WeatherBackdrop } from './WeatherBackdrop.tsx'
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
  const [open, setOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<number | undefined>(undefined)

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

  // Close the popup when a click lands outside the search block.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent): void => {
      if (!searchRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // Debounced live search: every keystroke re-queries, no Enter needed.
  const runSearch = useCallback(async (term: string): Promise<void> => {
    const trimmed = term.trim()
    if (trimmed.length === 0) {
      setMatches([])
      return
    }
    setSearching(true)
    try {
      setMatches(await searchCity(trimmed))
    } catch {
      setMatches([])
    } finally {
      setSearching(false)
    }
  }, [searchCity])

  const handleInput = (value: string): void => {
    setQuery(value)
    setOpen(true)
    window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => { void runSearch(value) }, 300)
  }

  useEffect(() => () => window.clearTimeout(debounceRef.current), [])

  const selectCity = async (city: CityResult): Promise<void> => {
    setQuery('')
    setMatches([])
    setOpen(false)
    setState({ status: 'locating' })
    try {
      const location = { latitude: city.latitude, longitude: city.longitude, name: city.name }
      const weather = await fetchWeather(location)
      setState({ status: 'ready', location, weather })
    } catch {
      setState({ status: 'error', message: 'error.weather' })
    }
  }

  const ready = state.status === 'ready'
  const loading = state.status === 'locating'
  const temperature = ready ? Math.round(state.weather.temperature) : undefined
  const description = ready ? t(weatherCodeKey(state.weather.weatherCode)) : undefined
  const place = ready ? (state.location.name ?? t('location.unknown')) : undefined
  const backdropState = ready ? weatherBackdrop(state.weather.weatherCode) : undefined
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
        disabled={loading}
        onClick={() => { void autoLocate() }}
      >
        {temperature !== undefined ? `${temperature}°` : '—'}
      </button>
    )
  }

  return (
    <div className={css.card}>
      {ready && backdropState !== undefined && <WeatherBackdrop state={backdropState} />}
      <div className={css.body}>
        <div className={css.head}>
          <span className={`${css.place}${backdropState === 'sunny' ? ` ${css.placeWithSun}` : ''}`}>
            {loading ? <span className={css.placeSkeleton} aria-hidden="true" /> : place}
          </span>
          <button
            type="button"
            className={css.refresh}
            aria-label={t('refresh')}
            title={t('refresh')}
            disabled={loading}
            onClick={() => { void autoLocate() }}
          >
            <RefreshIcon size={14} className={loading ? css.refreshSpinning : undefined} />
          </button>
        </div>

        {loading && (
          <div className={css.skeleton} aria-hidden="true">
            <span className={css.skeletonTemp} />
            <span className={css.skeletonLine} />
            <span className={css.skeletonLine} />
          </div>
        )}

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
            <WarningIcon size={14} className={css.errorIcon} />
            <span className={css.errorText}>{t(state.message)}</span>
            <button type="button" className={css.retry} onClick={() => { void autoLocate() }}>
              {t('refresh')}
            </button>
          </div>
        )}

        <div className={css.search} ref={searchRef}>
          <input
            className={css.searchInput}
            value={query}
            placeholder={t('search.placeholder')}
            aria-label={t('search.placeholder')}
            onFocus={() => setOpen(true)}
            onChange={(event) => { handleInput(event.target.value) }}
            onKeyDown={(event) => { if (event.key === 'Enter') void runSearch(query) }}
          />
          {open && query.trim().length === 0 && (
            <div className={css.popup}>
              <div className={css.popupTitle}>{t('search.popular')}</div>
              <ul className={css.popular}>
                {POPULAR_CITIES.map(city => (
                  <li key={city.id}>
                    <button
                      type="button"
                      className={css.popularChip}
                      onClick={() => { void selectCity(city) }}
                    >
                      {city.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {open && query.trim().length > 0 && (
            <div className={css.popup}>
              {searching && <div className={css.searching}>{t('locating')}</div>}
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
              {!searching && matches.length === 0 && (
                <div className={css.noMatches}>{t('search.empty')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
