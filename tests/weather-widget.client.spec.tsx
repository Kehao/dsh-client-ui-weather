// @vitest-environment jsdom
/**
 * ui-weather browser half: the weather card's rendering over stubbed inject
 * callbacks — locate/weather/search flows, rail vs wide, and error states.
 */
import { act, cleanup, fireEvent, render, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeTranslate } from './helpers.ts'
import { WeatherWidget, type WeatherWidgetProps } from '../src/client/WeatherWidget.tsx'
import { zh } from '../src/client/locales.ts'
import type { CurrentWeather, WeatherLocation } from '../src/client/weather-api.ts'

const t = makeTranslate(zh)

const beijing: WeatherLocation = { latitude: 39.9, longitude: 116.4, name: '北京市' }

const sunny: CurrentWeather = {
  temperature: 23.1,
  apparentTemperature: 25.2,
  humidity: 68,
  windSpeed: 2.1,
  weatherCode: 0,
  time: '2026-08-30T22:30',
}

// Global standard kit stubs: none of these components consume the hooks.
const unusedHook = (() => { throw new Error('unused by weather widget') }) as never
const kit = { useSessions: unusedHook, useSessionPendingInteraction: unusedHook, useWorkspaces: unusedHook }

function props(overrides: Partial<WeatherWidgetProps> = {}): WeatherWidgetProps {
  return {
    wide: true,
    resolveLocation: vi.fn().mockResolvedValue(beijing),
    fetchWeather: vi.fn().mockResolvedValue(sunny),
    searchCity: vi.fn().mockResolvedValue([]),
    t,
    ...kit,
    ...overrides,
  }
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('WeatherWidget', () => {
  it('auto-locates and renders current conditions on mount', async () => {
    const resolveLocation = vi.fn().mockResolvedValue(beijing)
    const fetchWeather = vi.fn().mockResolvedValue(sunny)
    const view = render(<WeatherWidget {...props({ resolveLocation, fetchWeather })} />)

    // Locating state shows a skeleton (aria-hidden) instead of shifting text.
    expect(view.container.querySelector('[aria-hidden="true"]')).toBeTruthy()
    expect(view.getByRole('button', { name: '刷新' })).toHaveProperty('disabled', true)
    await act(async () => { await Promise.resolve() })
    expect(resolveLocation).toHaveBeenCalledOnce()
    expect(fetchWeather).toHaveBeenCalledWith(beijing)
    expect(view.getByText('北京市')).toBeTruthy()
    expect(view.getByText('23°')).toBeTruthy()
    expect(view.getByText('☀️ 晴')).toBeTruthy()
    expect(view.getByText('体感 25°')).toBeTruthy()
    expect(view.getByText('湿度 68%')).toBeTruthy()
    expect(view.getByText('风速 2 km/h')).toBeTruthy()
  })

  it('falls back to the unknown-location label when no name is resolved', async () => {
    const view = render(<WeatherWidget {...props({
      resolveLocation: vi.fn().mockResolvedValue({ latitude: 0, longitude: 0 }),
    })} />)
    await act(async () => { await Promise.resolve() })
    expect(view.getByText('未知位置')).toBeTruthy()
  })

  it('shows the location error with a retry that re-locates', async () => {
    const resolveLocation = vi.fn()
      .mockRejectedValueOnce(new Error('denied'))
      .mockResolvedValueOnce(beijing)
    const fetchWeather = vi.fn().mockResolvedValue(sunny)
    const view = render(<WeatherWidget {...props({ resolveLocation, fetchWeather })} />)

    await act(async () => { await Promise.resolve() })
    expect(view.getByRole('alert')).toBeTruthy()
    expect(view.getByText('无法获取位置')).toBeTruthy()

    fireEvent.click(within(view.getByRole('alert')).getByRole('button'))
    await act(async () => { await Promise.resolve() })
    expect(resolveLocation).toHaveBeenCalledTimes(2)
    expect(view.getByText('北京市')).toBeTruthy()
  })

  it('shows the weather error when the forecast fetch fails', async () => {
    const view = render(<WeatherWidget {...props({
      fetchWeather: vi.fn().mockRejectedValue(new Error('offline')),
    })} />)
    await act(async () => { await Promise.resolve() })
    expect(view.getByRole('alert')).toBeTruthy()
    expect(view.getByText('天气获取失败')).toBeTruthy()
  })

  it('searches a city live on input and switches the location on selection', async () => {
    vi.useFakeTimers()
    const searchCity = vi.fn().mockResolvedValue([
      { id: 1, name: '上海市', admin1: '上海市', country: '中国', latitude: 31.23, longitude: 121.47 },
    ])
    const fetchWeather = vi.fn().mockResolvedValue(sunny)
    const view = render(<WeatherWidget {...props({ searchCity, fetchWeather })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.change(input, { target: { value: '上海' } })
    await act(async () => { await vi.advanceTimersByTimeAsync(300) })

    expect(searchCity).toHaveBeenCalledWith('上海')
    const match = view.getByRole('button', { name: '上海市 · 上海市 · 中国' })
    fireEvent.click(match)
    await act(async () => { await Promise.resolve() })

    expect(fetchWeather).toHaveBeenLastCalledWith({
      latitude: 31.23, longitude: 121.47, name: '上海市',
    })
    expect(view.getByText('上海市')).toBeTruthy()
    vi.useRealTimers()
  })

  it('reports when the search has no matches', async () => {
    vi.useFakeTimers()
    const view = render(<WeatherWidget {...props({
      searchCity: vi.fn().mockResolvedValue([]),
    })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.change(input, { target: { value: 'Atlantis' } })
    await act(async () => { await vi.advanceTimersByTimeAsync(300) })
    expect(view.getByText('未找到匹配的城市')).toBeTruthy()
    vi.useRealTimers()
  })

  it('replaces stale matches when the query changes', async () => {
    vi.useFakeTimers()
    const searchCity = vi.fn()
      .mockResolvedValueOnce([
        { id: 1, name: '上海市', latitude: 31.23, longitude: 121.47 },
      ])
      .mockResolvedValueOnce([
        { id: 2, name: '北京市', latitude: 39.9, longitude: 116.4 },
      ])
    const view = render(<WeatherWidget {...props({ searchCity })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.change(input, { target: { value: '上海' } })
    await act(async () => { await vi.advanceTimersByTimeAsync(300) })
    expect(view.getByRole('button', { name: '上海市' })).toBeTruthy()

    // The old match stays visible during the debounce window, then the new
    // query replaces it once the debounced search resolves.
    fireEvent.change(input, { target: { value: '北' } })
    await act(async () => { await vi.advanceTimersByTimeAsync(300) })
    expect(view.queryByRole('button', { name: '上海市' })).toBeNull()
    expect(view.getByRole('button', { name: '北京市' })).toBeTruthy()
    vi.useRealTimers()
  })

  it('shows popular city shortcuts when the input is empty and focused', () => {
    const view = render(<WeatherWidget {...props()} />)
    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.focus(input)
    expect(view.getByText('常用城市')).toBeTruthy()
    expect(view.getByRole('button', { name: '北京' })).toBeTruthy()
    expect(view.getByRole('button', { name: '上海' })).toBeTruthy()
  })

  it('switches to a popular city on chip click', async () => {
    const fetchWeather = vi.fn().mockResolvedValue(sunny)
    const view = render(<WeatherWidget {...props({ fetchWeather })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.focus(input)
    const chip = view.getByRole('button', { name: '北京' })
    fireEvent.click(chip)
    await act(async () => { await Promise.resolve() })

    expect(fetchWeather).toHaveBeenLastCalledWith({
      latitude: 39.9075, longitude: 116.39723, name: '北京',
    })
  })

  it('handles a search failure as no matches', async () => {
    const view = render(<WeatherWidget {...props({
      searchCity: vi.fn().mockRejectedValue(new Error('offline')),
    })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.change(input, { target: { value: '上海' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    await act(async () => { await Promise.resolve() })
    expect(view.getByText('未找到匹配的城市')).toBeTruthy()
  })

  it('renders a compact temperature pill on the rail', async () => {
    const view = render(<WeatherWidget {...props({ wide: false })} />)
    await act(async () => { await Promise.resolve() })
    const pill = view.getByRole('button', { name: '北京市 23° ☀️ 晴' })
    expect(pill).toBeTruthy()
    expect(within(pill).getByText('23°')).toBeTruthy()
  })

  it('ignores an empty search term', async () => {
    const searchCity = vi.fn()
    const view = render(<WeatherWidget {...props({ searchCity })} />)
    await act(async () => { await Promise.resolve() })

    const input = view.getByRole('textbox', { name: '搜索城市' })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(searchCity).not.toHaveBeenCalled()
  })

  it('refreshes via the card refresh button', async () => {
    const resolveLocation = vi.fn().mockResolvedValue(beijing)
    const fetchWeather = vi.fn().mockResolvedValue(sunny)
    const view = render(<WeatherWidget {...props({ resolveLocation, fetchWeather })} />)
    await act(async () => { await Promise.resolve() })

    fireEvent.click(view.getByRole('button', { name: '刷新' }))
    await act(async () => { await Promise.resolve() })
    expect(resolveLocation).toHaveBeenCalledTimes(2)
  })
})
