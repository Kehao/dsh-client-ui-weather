window.__ModuleLoader__.load({ id: "dsh-client-ui-weather", factory: (require) => {
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/WeatherWidget.tsx
var import_react = require("react");

// src/client/weather-code.ts
function weatherCodeKey(code) {
  if (code === 0) return "code.clear";
  if (code === 1) return "code.mainlyClear";
  if (code === 2) return "code.partlyCloudy";
  if (code === 3) return "code.overcast";
  if (code === 45 || code === 48) return "code.fog";
  if (code === 51 || code === 53 || code === 55) return "code.drizzle";
  if (code === 56 || code === 57) return "code.freezingDrizzle";
  if (code === 61 || code === 63 || code === 65) return "code.rain";
  if (code === 66 || code === 67) return "code.freezingRain";
  if (code === 71 || code === 73 || code === 75) return "code.snow";
  if (code === 77) return "code.snowGrains";
  if (code === 80 || code === 81 || code === 82) return "code.rainShowers";
  if (code === 85 || code === 86) return "code.snowShowers";
  if (code === 95) return "code.thunderstorm";
  if (code === 96 || code === 99) return "code.thunderstormHail";
  return "code.overcast";
}

// src/client/WeatherWidget.module.css
var css = "/* Sidebar-foot weather card. */\n\n.dad45340_card {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n  padding: 8px 10px;\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-2);\n  font-size: 13px;\n  line-height: 20px;\n  color: var(--dsw-alias-label-primary);\n}\n\n.2d7097dd_head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.e046666c_place {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-secondary);\n}\n\n.de0d966e_refresh {\n  flex: none;\n  margin: 0;\n  padding: 0 4px;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  font: inherit;\n  line-height: 20px;\n  cursor: pointer;\n}\n\n.de0d966e_refresh:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.de0d966e_refresh:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.928f03ae_main {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n}\n\n.9180e282_temp {\n  font-size: 28px;\n  line-height: 34px;\n  font-weight: 600;\n}\n\n.c5035864_desc {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.66660f1c_details {\n  display: flex;\n  flex-wrap: wrap;\n  column-gap: 12px;\n  row-gap: 2px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.88f52785_error {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.68a07c99_retry {\n  margin: 0;\n  padding: 0 8px;\n  border: none;\n  border-radius: 4px;\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  cursor: pointer;\n}\n\n.e56554a4_search {\n  position: relative;\n}\n\n.30bf7a47_searchInput {\n  width: 100%;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 2px 8px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-base);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  line-height: 22px;\n}\n\n.30bf7a47_searchInput::placeholder {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.30bf7a47_searchInput:focus-visible {\n  outline: none;\n  border-color: var(--dsw-alias-brand-primary);\n}\n\n.4e0a9abe_searching {\n  display: block;\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.67d0acf3_matches {\n  position: absolute;\n  z-index: 10;\n  left: 0;\n  right: 0;\n  top: calc(100% + 2px);\n  margin: 0;\n  padding: 4px;\n  list-style: none;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-overlay);\n  box-shadow: 0 4px 16px var(--dsw-alias-bg-mask-1);\n}\n\n.2ce5fc5c_match {\n  display: block;\n  width: 100%;\n  margin: 0;\n  padding: 4px 8px;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.2ce5fc5c_match:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.5c2691e5_noMatches {\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n/* Rail (collapsed 56px column): one temperature pill. */\n.0373eed5_rail {\n  margin: 0;\n  padding: 2px 6px;\n  border: none;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-secondary);\n  font: inherit;\n  font-size: 12px;\n  line-height: 18px;\n  cursor: pointer;\n}\n\n.0373eed5_rail:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.0373eed5_rail:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 2px var(--dsw-alias-border-l3);\n}\n";
var tagId = "dsh-client-ui-weather/src/client/WeatherWidget.module.css";
if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-client-ui-weather";
  tag.dataset.pluginCss = tagId;
  tag.textContent = css;
  document.head.appendChild(tag);
}
var WeatherWidget_default = { "card": "dad45340_card", "head": "2d7097dd_head", "place": "e046666c_place", "refresh": "de0d966e_refresh", "main": "928f03ae_main", "temp": "9180e282_temp", "desc": "c5035864_desc", "details": "66660f1c_details", "error": "88f52785_error", "retry": "68a07c99_retry", "search": "e56554a4_search", "searchInput": "30bf7a47_searchInput", "searching": "4e0a9abe_searching", "matches": "67d0acf3_matches", "match": "2ce5fc5c_match", "noMatches": "5c2691e5_noMatches", "rail": "0373eed5_rail" };

// src/client/WeatherWidget.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function WeatherWidget({ wide, t, resolveLocation: resolveLocation2, fetchWeather, searchCity: searchCity2 }) {
  const [state, setState] = (0, import_react.useState)({ status: "locating" });
  const [query, setQuery] = (0, import_react.useState)("");
  const [matches, setMatches] = (0, import_react.useState)([]);
  const [searching, setSearching] = (0, import_react.useState)(false);
  const autoLocate = (0, import_react.useCallback)(async () => {
    setState({ status: "locating" });
    let location;
    try {
      location = await resolveLocation2();
    } catch {
      setState({ status: "error", message: "error.location" });
      return;
    }
    try {
      const weather = await fetchWeather(location);
      setState({ status: "ready", location, weather });
    } catch {
      setState({ status: "error", message: "error.weather" });
    }
  }, [resolveLocation2, fetchWeather]);
  (0, import_react.useEffect)(() => {
    void autoLocate();
  }, [autoLocate]);
  const selectCity = async (city) => {
    setQuery("");
    setMatches([]);
    setState({ status: "locating" });
    try {
      const location = { latitude: city.latitude, longitude: city.longitude, name: city.name };
      const weather = await fetchWeather(location);
      setState({ status: "ready", location, weather });
    } catch {
      setState({ status: "error", message: "error.weather" });
    }
  };
  const runSearch = async () => {
    const term = query.trim();
    if (term.length === 0) return;
    setSearching(true);
    try {
      setMatches(await searchCity2(term));
    } catch {
      setMatches([]);
    } finally {
      setSearching(false);
    }
  };
  const ready = state.status === "ready";
  const temperature = ready ? Math.round(state.weather.temperature) : void 0;
  const description = ready ? t(weatherCodeKey(state.weather.weatherCode)) : void 0;
  const place = ready ? state.location.name ?? t("location.unknown") : void 0;
  const summary = ready ? `${place} ${temperature}\xB0 ${description}` : t("locating");
  if (!wide) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: WeatherWidget_default.rail,
        "aria-label": summary,
        title: summary,
        onClick: () => {
          void autoLocate();
        },
        children: temperature !== void 0 ? `${temperature}\xB0` : "\u2014"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.card, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.head, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: WeatherWidget_default.place, children: ready ? place : t("locating") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: WeatherWidget_default.refresh,
          "aria-label": t("refresh"),
          title: t("refresh"),
          onClick: () => {
            void autoLocate();
          },
          children: "\u21BB"
        }
      )
    ] }),
    ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.main, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: WeatherWidget_default.temp, children: [
          temperature,
          "\xB0"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: WeatherWidget_default.desc, children: description })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.details, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("feelsLike", { temp: Math.round(state.weather.apparentTemperature) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("humidity", { value: state.weather.humidity }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("wind", { value: Math.round(state.weather.windSpeed) }) })
      ] })
    ] }),
    state.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.error, role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(state.message) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: WeatherWidget_default.retry, onClick: () => {
        void autoLocate();
      }, children: t("refresh") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: WeatherWidget_default.search, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          className: WeatherWidget_default.searchInput,
          value: query,
          placeholder: t("search.placeholder"),
          "aria-label": t("search.placeholder"),
          onChange: (event) => {
            setQuery(event.target.value);
            setMatches([]);
          },
          onKeyDown: (event) => {
            if (event.key === "Enter") void runSearch();
          }
        }
      ),
      searching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: WeatherWidget_default.searching, children: t("locating") }),
      !searching && matches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: WeatherWidget_default.matches, children: matches.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: WeatherWidget_default.match,
          onClick: () => {
            void selectCity(city);
          },
          children: [
            city.name,
            city.admin1 !== void 0 ? ` \xB7 ${city.admin1}` : "",
            city.country !== void 0 ? ` \xB7 ${city.country}` : ""
          ]
        }
      ) }, city.id)) }),
      !searching && matches.length === 0 && query.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: WeatherWidget_default.noMatches, children: t("search.empty") })
    ] })
  ] });
}

// src/client/locales.ts
var NS = "weather";
var zh = {
  "locating": "\u6B63\u5728\u5B9A\u4F4D\u2026",
  "location.unknown": "\u672A\u77E5\u4F4D\u7F6E",
  "error.location": "\u65E0\u6CD5\u83B7\u53D6\u4F4D\u7F6E",
  "error.weather": "\u5929\u6C14\u83B7\u53D6\u5931\u8D25",
  "refresh": "\u5237\u65B0",
  "search.placeholder": "\u641C\u7D22\u57CE\u5E02",
  "search.empty": "\u672A\u627E\u5230\u5339\u914D\u7684\u57CE\u5E02",
  "feelsLike": "\u4F53\u611F {temp}\xB0",
  "humidity": "\u6E7F\u5EA6 {value}%",
  "wind": "\u98CE\u901F {value} km/h",
  "code.clear": "\u2600\uFE0F \u6674",
  "code.mainlyClear": "\u{1F324}\uFE0F \u5927\u90E8\u6674\u6717",
  "code.partlyCloudy": "\u26C5 \u5C40\u90E8\u591A\u4E91",
  "code.overcast": "\u2601\uFE0F \u9634",
  "code.fog": "\u{1F32B}\uFE0F \u96FE",
  "code.drizzle": "\u{1F326}\uFE0F \u6BDB\u6BDB\u96E8",
  "code.freezingDrizzle": "\u{1F327}\uFE0F \u51BB\u6BDB\u6BDB\u96E8",
  "code.rain": "\u{1F327}\uFE0F \u96E8",
  "code.freezingRain": "\u{1F327}\uFE0F \u51BB\u96E8",
  "code.snow": "\u2744\uFE0F \u96EA",
  "code.snowGrains": "\u2744\uFE0F \u96EA\u7C92",
  "code.rainShowers": "\u{1F326}\uFE0F \u9635\u96E8",
  "code.snowShowers": "\u{1F328}\uFE0F \u9635\u96EA",
  "code.thunderstorm": "\u26C8\uFE0F \u96F7\u66B4",
  "code.thunderstormHail": "\u26C8\uFE0F \u96F7\u66B4\u4F34\u51B0\u96F9"
};
var en = {
  "locating": "Locating\u2026",
  "location.unknown": "Unknown location",
  "error.location": "Location unavailable",
  "error.weather": "Weather unavailable",
  "refresh": "Refresh",
  "search.placeholder": "Search city",
  "search.empty": "No matching city",
  "feelsLike": "Feels like {temp}\xB0",
  "humidity": "Humidity {value}%",
  "wind": "Wind {value} km/h",
  "code.clear": "\u2600\uFE0F Clear",
  "code.mainlyClear": "\u{1F324}\uFE0F Mainly clear",
  "code.partlyCloudy": "\u26C5 Partly cloudy",
  "code.overcast": "\u2601\uFE0F Overcast",
  "code.fog": "\u{1F32B}\uFE0F Fog",
  "code.drizzle": "\u{1F326}\uFE0F Drizzle",
  "code.freezingDrizzle": "\u{1F327}\uFE0F Freezing drizzle",
  "code.rain": "\u{1F327}\uFE0F Rain",
  "code.freezingRain": "\u{1F327}\uFE0F Freezing rain",
  "code.snow": "\u2744\uFE0F Snow",
  "code.snowGrains": "\u2744\uFE0F Snow grains",
  "code.rainShowers": "\u{1F326}\uFE0F Rain showers",
  "code.snowShowers": "\u{1F328}\uFE0F Snow showers",
  "code.thunderstorm": "\u26C8\uFE0F Thunderstorm",
  "code.thunderstormHail": "\u26C8\uFE0F Thunderstorm with hail"
};

// src/client/weather-api.ts
var LocationUnavailableError = class extends Error {
};
var WeatherApiError = class extends Error {
};
var FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
var GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
var REVERSE_GEOCODE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
var IP_LOOKUP_URLS = [
  "https://ipwho.is/",
  "https://ipapi.co/json/"
];
var GEOLOCATION_TIMEOUT_MS = 8e3;
async function fetchCurrentWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    timezone: "auto"
  });
  const payload = await requestJson(`${FORECAST_URL}?${params}`);
  const current = payload.current;
  if (current === void 0 || typeof current.temperature_2m !== "number" || typeof current.apparent_temperature !== "number" || typeof current.relative_humidity_2m !== "number" || typeof current.weather_code !== "number" || typeof current.wind_speed_10m !== "number") {
    throw new WeatherApiError("Open-Meteo forecast payload lacks current conditions");
  }
  return {
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    time: typeof current.time === "string" ? current.time : ""
  };
}
async function searchCity(query) {
  const params = new URLSearchParams({
    name: query,
    count: "5",
    language: "zh",
    format: "json"
  });
  const payload = await requestJson(`${GEOCODING_URL}?${params}`);
  if (!Array.isArray(payload.results)) return [];
  const results = [];
  for (const raw of payload.results) {
    const entry = raw;
    if (typeof entry.id !== "number" || typeof entry.name !== "string" || typeof entry.latitude !== "number" || typeof entry.longitude !== "number") continue;
    results.push({
      id: entry.id,
      name: entry.name,
      ...typeof entry.admin1 === "string" ? { admin1: entry.admin1 } : {},
      ...typeof entry.country === "string" ? { country: entry.country } : {},
      latitude: entry.latitude,
      longitude: entry.longitude
    });
  }
  return results;
}
async function resolveLocation() {
  if (typeof navigator !== "undefined" && "geolocation" in navigator) {
    try {
      const coords = await browserCoords();
      let name;
      try {
        name = await reverseGeocode(coords.latitude, coords.longitude);
      } catch {
      }
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        ...name !== void 0 ? { name } : {}
      };
    } catch {
    }
  }
  for (const url of IP_LOOKUP_URLS) {
    try {
      const location = await ipLocation(url);
      if (location !== void 0) return location;
    } catch {
    }
  }
  throw new LocationUnavailableError("no geolocation or IP location source answered");
}
async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: "zh"
  });
  const payload = await requestJson(
    `${REVERSE_GEOCODE_URL}?${params}`
  );
  if (typeof payload.city === "string" && payload.city.length > 0) return payload.city;
  if (typeof payload.locality === "string" && payload.locality.length > 0) return payload.locality;
  return void 0;
}
async function ipLocation(url) {
  const payload = await requestJson(url);
  const latitude = typeof payload.latitude === "number" ? payload.latitude : typeof payload.lat === "number" ? payload.lat : void 0;
  const longitude = typeof payload.longitude === "number" ? payload.longitude : typeof payload.lon === "number" ? payload.lon : void 0;
  if (latitude === void 0 || longitude === void 0) return void 0;
  return {
    latitude,
    longitude,
    ...typeof payload.city === "string" && payload.city.length > 0 ? { name: payload.city } : {}
  };
}
function browserCoords() {
  return new Promise((resolve, reject) => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(
      (position) => {
        resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      (error) => {
        reject(new Error(error.message));
      },
      { enableHighAccuracy: true, timeout: GEOLOCATION_TIMEOUT_MS, maximumAge: 6e4 }
    );
  });
}
async function requestJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherApiError(`weather request failed with HTTP ${response.status}`);
  }
  return await response.json();
}

// src/client/index.ts
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-weather: dictionaries");
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "weather",
    order: 100,
    locale: NS,
    inject: () => ({
      resolveLocation,
      fetchWeather: ({ latitude, longitude }) => fetchCurrentWeather(latitude, longitude),
      searchCity
    })
  }, WeatherWidget));
}
return module.exports; } });
//# sourceMappingURL=client.js.map
