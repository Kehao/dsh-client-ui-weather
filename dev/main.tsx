/**
 * Playground entry: renders the real WeatherWidget against the stubbed
 * inject face, with a control panel to switch scenario, sidebar width,
 * language, and error modes. Run `pnpm dev`.
 */
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { WeatherWidget } from '../src/client/WeatherWidget.tsx'
import { en, zh } from '../src/client/locales.ts'
import {
  ALL_SCENARIOS, buildStubInjected, delayReject, makeLocaleStub, type WeatherScenario,
} from './mock.ts'
import './playground.css'

type ErrorMode = 'none' | 'location' | 'weather'

const localeStub = makeLocaleStub(zh, en)

function Playground() {
  const [scenario, setScenario] = useState<WeatherScenario>(ALL_SCENARIOS[0])
  const [wide, setWide] = useState(true)
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const [errorMode, setErrorMode] = useState<ErrorMode>('none')
  const [remountKey, setRemountKey] = useState(0)

  useEffect(() => {
    localeStub.setLanguage(language)
  }, [language])

  // Rebuild the stub whenever the scenario or error mode changes; the
  // remount key forces the widget to re-run its mount auto-locate.
  const injected = buildStubInjected(scenario)
  if (errorMode === 'location') {
    injected.resolveLocation = () => delayReject()
  }
  if (errorMode === 'weather') {
    injected.fetchWeather = () => delayReject()
  }

  return (
    <div className="playground">
      <header className="panel">
        <h1>dsh-client-ui-weather playground</h1>
        <div className="controls">
          <label>
            场景
            <select
              value={scenario.id}
              onChange={(event) => {
                const next = ALL_SCENARIOS.find(item => item.id === event.target.value)
                if (next !== undefined) {
                  setScenario(next)
                  setRemountKey(key => key + 1)
                }
              }}
            >
              {ALL_SCENARIOS.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
          <label>
            宽度
            <select
              value={wide ? 'wide' : 'rail'}
              onChange={(event) => { setWide(event.target.value === 'wide') }}
            >
              <option value="wide">宽栏（wide）</option>
              <option value="rail">窄栏（rail 56px）</option>
            </select>
          </label>
          <label>
            语言
            <select
              value={language}
              onChange={(event) => { setLanguage(event.target.value as 'zh' | 'en') }}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </label>
          <label>
            错误模式
            <select
              value={errorMode}
              onChange={(event) => {
                setErrorMode(event.target.value as ErrorMode)
                setRemountKey(key => key + 1)
              }}
            >
              <option value="none">无</option>
              <option value="location">定位失败</option>
              <option value="weather">天气获取失败</option>
            </select>
          </label>
        </div>
      </header>

      <main className={`stage ${wide ? 'wide' : 'rail'}`}>
        <WeatherWidget
          key={remountKey}
          wide={wide}
          t={localeStub.t}
          {...injected}
        />
        <div className="hint">
          上方控件实时切换；场景/错误变更会重新挂载组件以重跑定位流程。
        </div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<Playground />)
