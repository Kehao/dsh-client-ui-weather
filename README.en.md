# dsh-client-ui-weather

English | [中文](README.md)

A local weather card for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI sidebar: browser geolocation with IP fallback, current conditions, and a manual city search — all over the keyless [Open-Meteo](https://open-meteo.com/) API.

## Features

- **Auto-locate**: browser geolocation first, then IP lookups (`ipwho.is`, `ipapi.co`), then a manual city search.
- **Current conditions**: temperature, condition, feels-like, humidity, and wind in metric units.
- **City search**: pick a settlement from the Open-Meteo geocoding API to override the location.
- **Responsive**: a full card in the wide sidebar, a temperature pill on the 56px rail.
- **Localized**: `zh` and `en` dictionaries through the standard `t` seat.

## Install

The package ships as a standalone, self-contained npm package with the built `lib/` committed to the repository, so a git install works out of the box with **no build permission needed**. Install it from a git host or a local checkout:

```sh
# From a git host (pin a commit so a later push cannot silently change what runs)
dsh plugin --profile demo add github:you/dsh-client-ui-weather#<sha>

# Or from a local checkout
dsh plugin --profile demo add /path/to/dsh-client-ui-weather

# Or from a packed tarball
pnpm pack
dsh plugin --profile demo add ./dsh-client-ui-weather-0.1.0.tgz
```

The package declares no `prepare` script, so pnpm installs the committed `lib/` artifacts directly and never asks for a build-script allowance.

### Enable the browser surface

This package is a *client* plugin (`dsh.client` declaration), not a `dsh.bundle` configuration layer, so `dsh plugin add` installs the dependency but does not activate a layer by itself. Add one row to your profile's `cordis.patch.yml` (or a `--patch` overlay) to load it:

```yaml
# Local weather card in the sidebar foot (dsh-client-ui-weather plugin).
- insert:
    - id: ui-weather
      name: dsh-client-ui-weather
```

The dsh web client-modules scanner picks up any loaded entry whose package declares `dsh.client`, so the weather card appears in the sidebar foot (above the Settings trigger) on the next `dsh web` start.

## Data sources

| Data | Source | Key |
|---|---|---|
| Current conditions | [Open-Meteo forecast API](https://open-meteo.com/en/docs) | none |
| City search | [Open-Meteo geocoding API](https://open-meteo.com/en/docs/geocoding-api) | none |
| IP location | `ipwho.is`, then `ipapi.co` | none |
| Reverse geocoding | [BigDataCloud reverse-geocode-client](https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api) | none |

All requests are plain browser `fetch` calls to HTTPS endpoints with CORS headers; no API key is required.

## Development

```sh
pnpm install      # dev toolchain (esbuild, typescript, vitest)
pnpm run build    # rebuild lib/ (bundle + type declarations)
pnpm test         # run the vitest suite (data layer, WMO mapping, component, registration)
pnpm run typecheck
```

The browser bundle is emitted in the dsh client-modules wire format (`window.__ModuleLoader__.load({ id, factory })`) with CSS Modules compiled to hashed class maps plus an injected style tag; platform modules (`react`, cordis, slots, …) stay external and resolve from the host shell.

## Model Experience

None, as the weather card is a browser-side UI plugin layer that registers nothing model-facing.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

These limits define the current weather vocabulary. They are current package constraints, not a task backlog.

- IP location services are rate-limited third parties; when both `ipwho.is` and `ipapi.co` answer with a failure the card shows the location error and relies on the city search.
- The geolocation prompt appears on every page load unless the browser remembers the choice; the card does not persist a user-picked city across reloads.
- Conditions are current-only; hourly/daily forecasts are not rendered.
- All measurements are shown in metric units (°C, km/h, %) as returned by Open-Meteo; there is no unit toggle.
- The plugin targets the dsh web sidebar's `sidebar.footer.action` slot; it requires the official `ui-sidebar` and `ui-renderer` client packages to be present in the host.

### Dev Note

The data layer, WMO mapping, and widget are covered by node-env data specs and a jsdom component spec; the registration spec drives the apply contract against service doubles (the dsh monorepo's test-runtime package is not fully published to npm). No network calls run in tests.

## License

MIT
