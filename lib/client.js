window.__ModuleLoader__.load({ id: "dsh-client-ui-weather", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
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
function weatherBackdrop(code) {
  if (code === 0 || code === 1 || code === 2) return "sunny";
  if (code === 3 || code === 45 || code === 48) return "cloudy";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code >= 85 && code <= 86) return "snow";
  return "storm";
}

// src/client/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function RefreshIcon({ size = 16, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, className, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: "M7.92136 0.349152C10.3744 0.349234 12.5564 1.5052 13.9557 3.29894L15.1281 2.12759C15.3303 1.92546 15.6767 2.06943 15.6767 2.35538V5.53923C15.6766 5.71626 15.5329 5.85976 15.3559 5.86002H12.171C11.8854 5.8597 11.7426 5.51465 11.9443 5.31249L12.9641 4.29056C11.8237 2.74305 9.98908 1.74106 7.92136 1.74097C4.46436 1.74097 1.66233 4.543 1.66233 8C1.66233 11.457 4.46436 14.259 7.92136 14.259C11.3782 14.2589 14.1804 11.4569 14.1804 8H15.5722C15.5722 12.2251 12.1465 15.6507 7.92136 15.6508C3.69614 15.6508 0.270508 12.2252 0.270508 8C0.270508 3.77478 3.69614 0.349152 7.92136 0.349152Z",
      fill: "currentColor"
    }
  ) });
}
function WarningIcon({ size = 16, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: size, height: size, className, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      d: "M8 0.25C3.71979 0.25 0.25 3.71979 0.25 8C0.25 12.2802 3.71979 15.75 8 15.75C12.2802 15.75 15.75 12.2802 15.75 8C15.75 3.71979 12.2802 0.25 8 0.25ZM7.25 4.5C7.25 4.08579 7.58579 3.75 8 3.75C8.41421 3.75 8.75 4.08579 8.75 4.5V8.5C8.75 8.91421 8.41421 9.25 8 9.25C7.58579 9.25 7.25 8.91421 7.25 8.5V4.5ZM8 12.25C7.58579 12.25 7.25 11.9142 7.25 11.5C7.25 11.0858 7.58579 10.75 8 10.75C8.41421 10.75 8.75 11.0858 8.75 11.5C8.75 11.9142 8.41421 12.25 8 12.25Z",
      fill: "currentColor"
    }
  ) });
}

// src/client/WeatherBackdrop.module.css
var css = "/* Animated weather backdrop: pure CSS layers keyed by data-state.\n   Decor only \u2014 never intercepts pointer events, frozen under\n   prefers-reduced-motion. Particle colors are theme-aware custom\n   properties: dark tints on the light surface, light tints on the dark\n   surface, so every state reads on both themes. */\n\n/* Light theme: near-white card, so particles are dark tints. */\n.61617f0a_backdrop {\n  --backdrop-sun: rgba(255, 176, 59, 0.85);\n  --backdrop-sun-glow: rgba(255, 190, 90, 0.55);\n  --backdrop-sun-ray: rgba(214, 158, 46, 0.55);\n  --backdrop-cloud: rgba(96, 116, 142, 0.4);\n  --backdrop-rain: rgba(84, 116, 156, 0.5);\n  --backdrop-rain-bright: rgba(66, 98, 138, 0.65);\n  --backdrop-snow: rgba(148, 170, 196, 0.85);\n  --backdrop-snow-soft: rgba(120, 148, 180, 0.7);\n  --backdrop-flash: rgba(60, 90, 140, 0.85);\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  border-radius: inherit;\n  pointer-events: none;\n}\n\n/* Dark theme: near-black card, so particles are light tints. */\nbody[data-ds-dark-theme] .61617f0a_backdrop {\n  --backdrop-sun: rgba(255, 214, 120, 0.95);\n  --backdrop-sun-glow: rgba(255, 190, 90, 0.55);\n  --backdrop-sun-ray: rgba(255, 210, 120, 0.5);\n  --backdrop-cloud: rgba(160, 180, 205, 0.45);\n  --backdrop-rain: rgba(190, 215, 240, 0.5);\n  --backdrop-rain-bright: rgba(200, 225, 250, 0.65);\n  --backdrop-snow: rgba(235, 245, 255, 0.9);\n  --backdrop-snow-soft: rgba(240, 248, 255, 0.75);\n  --backdrop-flash: rgba(220, 235, 255, 0.85);\n}\n\n/* \u2500\u2500 sun (sunny state) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.5ba75a91_sun {\n  position: absolute;\n  top: 12px;\n  right: 14px;\n  width: 44px;\n  height: 44px;\n  opacity: 0;\n  transition: opacity 0.7s ease;\n}\n\n[data-state='sunny'] .5ba75a91_sun {\n  opacity: 1;\n}\n\n.1b3f1d82_sunCore {\n  position: absolute;\n  inset: 8px;\n  border-radius: 50%;\n  background: radial-gradient(\n    circle at 35% 35%,\n    var(--backdrop-sun),\n    var(--backdrop-sun) 65%,\n    rgba(255, 154, 43, 0.7)\n  );\n  box-shadow: 0 0 18px var(--backdrop-sun-glow);\n}\n\n.81334e2a_sunRays {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  background: repeating-conic-gradient(\n    from 0deg,\n    var(--backdrop-sun-ray) 0deg 10deg,\n    transparent 10deg 30deg\n  );\n  mask-image: radial-gradient(circle, transparent 42%, #000 46%);\n  animation: sun-rotate 18s linear infinite;\n}\n\n@keyframes sun-rotate {\n  to { transform: rotate(360deg); }\n}\n\n/* \u2500\u2500 drifting clouds (cloudy state) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.e91cc880_clouds {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  transition: opacity 0.7s ease;\n}\n\n[data-state='cloudy'] .e91cc880_clouds {\n  opacity: 1;\n}\n\n.f24ec694_cloud {\n  position: absolute;\n  width: 56px;\n  height: 18px;\n  border-radius: 999px;\n  background: var(--backdrop-cloud);\n  filter: blur(1px);\n  animation: cloud-drift linear infinite;\n}\n\n.f24ec694_cloud::before,\n.f24ec694_cloud::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  background: inherit;\n}\n\n.f24ec694_cloud::before {\n  width: 24px;\n  height: 24px;\n  left: 10px;\n  top: -12px;\n}\n\n.f24ec694_cloud::after {\n  width: 18px;\n  height: 18px;\n  right: 12px;\n  top: -8px;\n}\n\n.f24ec694_cloud:nth-child(1) {\n  top: 6px;\n  left: -60px;\n  animation-duration: 26s;\n}\n\n.f24ec694_cloud:nth-child(2) {\n  top: 26px;\n  left: -90px;\n  transform: scale(0.7);\n  animation-duration: 34s;\n  animation-delay: -12s;\n}\n\n.f24ec694_cloud:nth-child(3) {\n  top: 44px;\n  left: -70px;\n  transform: scale(0.5);\n  animation-duration: 42s;\n  animation-delay: -24s;\n}\n\n@keyframes cloud-drift {\n  to { transform: translateX(340px); }\n}\n\n/* \u2500\u2500 precipitation: repeating-gradient fall (rain / snow) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.77b3dadb_precipitation {\n  position: absolute;\n  inset: -30%;\n  opacity: 0;\n  transition: opacity 0.7s ease;\n}\n\n[data-state='rain'] .77b3dadb_precipitation {\n  opacity: 1;\n  background-image:\n    radial-gradient(0.8px 8px at 50% 0%, var(--backdrop-rain), transparent 80%),\n    radial-gradient(1px 11px at 50% 0%, var(--backdrop-rain-bright), transparent 80%);\n  background-size: 30px 46px, 40px 58px;\n  transform: skewX(-12deg);\n  animation: rain-fall 0.55s linear infinite;\n}\n\n[data-state='snow'] .77b3dadb_precipitation {\n  opacity: 1;\n  background-image:\n    radial-gradient(2px 2px at 50% 50%, var(--backdrop-snow), transparent 60%),\n    radial-gradient(2.5px 2.5px at 50% 50%, var(--backdrop-snow-soft), transparent 60%);\n  background-size: 64px 92px, 86px 120px;\n  animation: snow-fall 5s linear infinite;\n}\n\n@keyframes rain-fall {\n  to { background-position: 0 46px, 0 58px; }\n}\n\n@keyframes snow-fall {\n  to { background-position: 6px 92px, -8px 120px; }\n}\n\n/* \u2500\u2500 storm flash \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.44c14969_lightning {\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  background: var(--backdrop-flash);\n  pointer-events: none;\n}\n\n[data-state='storm'] .44c14969_lightning {\n  animation: storm-flash 4.5s ease-in-out infinite;\n}\n\n@keyframes storm-flash {\n  0%, 82%, 90%, 100% { opacity: 0; }\n  84%, 88% { opacity: 0.5; }\n  86% { opacity: 0.9; }\n}\n\n/* \u2500\u2500 reduced motion: freeze all animation, keep a static tint \u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n@media (prefers-reduced-motion: reduce) {\n  .81334e2a_sunRays,\n  .f24ec694_cloud,\n  [data-state='rain'] .77b3dadb_precipitation,\n  [data-state='snow'] .77b3dadb_precipitation,\n  [data-state='storm'] .44c14969_lightning {\n    animation: none !important;\n  }\n}\n";
var tagId = "dsh-client-ui-weather/src/client/WeatherBackdrop.module.css";
if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-client-ui-weather";
  tag.dataset.pluginCss = tagId;
  tag.textContent = css;
  document.head.appendChild(tag);
}
var WeatherBackdrop_default = { "backdrop": "61617f0a_backdrop", "sun": "5ba75a91_sun", "sunCore": "1b3f1d82_sunCore", "sunRays": "81334e2a_sunRays", "clouds": "e91cc880_clouds", "cloud": "f24ec694_cloud", "precipitation": "77b3dadb_precipitation", "lightning": "44c14969_lightning" };

// src/client/WeatherBackdrop.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function WeatherBackdrop({ state }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: WeatherBackdrop_default.backdrop, "data-state": state, "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: WeatherBackdrop_default.sun, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.sunCore }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.sunRays })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: WeatherBackdrop_default.clouds, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.cloud }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.cloud }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.cloud })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.precipitation }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: WeatherBackdrop_default.lightning })
  ] });
}

// src/client/WeatherWidget.module.css
var css2 = "/* Sidebar-foot weather card. */\n\n.dad45340_card {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 8px 10px;\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-2);\n  font-size: 13px;\n  line-height: 20px;\n  color: var(--dsw-alias-label-primary);\n}\n\n/* Content layer above the animated backdrop. */\n.a79ef60e_body {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.2d7097dd_head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  min-height: 20px;\n}\n\n.e046666c_place {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-secondary);\n}\n\n/* Loading placeholder for the location name: keeps the header height stable\n   while locating, so the ready state does not shift the layout. */\n.02884f7c_placeSkeleton {\n  display: inline-block;\n  width: 96px;\n  height: 12px;\n  margin-top: 4px;\n  border-radius: 4px;\n  background: var(--dsw-alias-bg-skeleton);\n}\n\n.de0d966e_refresh {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  width: 20px;\n  height: 20px;\n  margin: 0;\n  padding: 0;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: var(--dsw-alias-label-tertiary);\n  cursor: pointer;\n}\n\n.de0d966e_refresh:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.de0d966e_refresh:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.de0d966e_refresh:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n/* A locating refresh spins once per request; static when idle. */\n.0dda9a82_refreshSpinning {\n  animation: refresh-spin 0.8s linear infinite;\n}\n\n@keyframes refresh-spin {\n  to { transform: rotate(360deg); }\n}\n\n.928f03ae_main {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n}\n\n.9180e282_temp {\n  font-size: 28px;\n  line-height: 34px;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -0.5px;\n}\n\n.c5035864_desc {\n  color: var(--dsw-alias-label-secondary);\n}\n\n.66660f1c_details {\n  display: flex;\n  flex-wrap: wrap;\n  column-gap: 12px;\n  row-gap: 2px;\n  color: var(--dsw-alias-label-tertiary);\n  font-variant-numeric: tabular-nums;\n}\n\n/* Skeleton block mirroring the ready main+details rows, so the card height\n   does not jump when conditions arrive. */\n.d702bca4_skeleton {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.8cf44879_skeletonTemp {\n  display: block;\n  width: 64px;\n  height: 30px;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-skeleton);\n}\n\n.1d445901_skeletonLine {\n  display: block;\n  width: 100%;\n  height: 12px;\n  border-radius: 4px;\n  background: var(--dsw-alias-bg-skeleton);\n}\n\n.88f52785_error {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.c2b88932_errorIcon {\n  flex: none;\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.bb93750f_errorText {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-state-error-primary);\n}\n\n.68a07c99_retry {\n  flex: none;\n  margin: 0;\n  padding: 0 8px;\n  border: none;\n  border-radius: 4px;\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  cursor: pointer;\n}\n\n.68a07c99_retry:hover {\n  background: var(--dsw-alias-interactive-bg-active);\n}\n\n.e56554a4_search {\n  position: relative;\n}\n\n.30bf7a47_searchInput {\n  width: 100%;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 2px 8px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-base);\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  line-height: 22px;\n}\n\n.30bf7a47_searchInput::placeholder {\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.30bf7a47_searchInput:focus-visible {\n  outline: none;\n  border-color: var(--dsw-alias-brand-primary);\n}\n\n.4e0a9abe_searching {\n  display: block;\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n.67d0acf3_matches {\n  position: absolute;\n  z-index: 10;\n  left: 0;\n  right: 0;\n  top: calc(100% + 2px);\n  margin: 0;\n  padding: 4px;\n  list-style: none;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-overlay);\n  box-shadow: 0 4px 16px var(--dsw-alias-bg-mask-1);\n}\n\n.2ce5fc5c_match {\n  display: block;\n  width: 100%;\n  margin: 0;\n  padding: 4px 8px;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n.2ce5fc5c_match:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.5c2691e5_noMatches {\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary);\n}\n\n/* Rail (collapsed 56px column): one temperature pill. */\n.0373eed5_rail {\n  margin: 0;\n  padding: 2px 6px;\n  border: none;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-layer-2);\n  color: var(--dsw-alias-label-secondary);\n  font: inherit;\n  font-size: 12px;\n  line-height: 18px;\n  font-variant-numeric: tabular-nums;\n  cursor: pointer;\n}\n\n.0373eed5_rail:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n  color: var(--dsw-alias-label-primary);\n}\n\n.0373eed5_rail:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.0373eed5_rail:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n/* The spin communicates an in-flight request; users who prefer reduced motion\n   see the static skeleton instead. */\n@media (prefers-reduced-motion: reduce) {\n  .0dda9a82_refreshSpinning {\n    animation: none;\n  }\n}\n";
var tagId2 = "dsh-client-ui-weather/src/client/WeatherWidget.module.css";
if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId2 + '"]') === null) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-client-ui-weather";
  tag.dataset.pluginCss = tagId2;
  tag.textContent = css2;
  document.head.appendChild(tag);
}
var WeatherWidget_default = { "card": "dad45340_card", "body": "a79ef60e_body", "head": "2d7097dd_head", "place": "e046666c_place", "placeSkeleton": "02884f7c_placeSkeleton", "refresh": "de0d966e_refresh", "refreshSpinning": "0dda9a82_refreshSpinning", "main": "928f03ae_main", "temp": "9180e282_temp", "desc": "c5035864_desc", "details": "66660f1c_details", "skeleton": "d702bca4_skeleton", "skeletonTemp": "8cf44879_skeletonTemp", "skeletonLine": "1d445901_skeletonLine", "error": "88f52785_error", "errorIcon": "c2b88932_errorIcon", "errorText": "bb93750f_errorText", "retry": "68a07c99_retry", "search": "e56554a4_search", "searchInput": "30bf7a47_searchInput", "searching": "4e0a9abe_searching", "matches": "67d0acf3_matches", "match": "2ce5fc5c_match", "noMatches": "5c2691e5_noMatches", "rail": "0373eed5_rail" };

// src/client/WeatherWidget.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  const loading = state.status === "locating";
  const temperature = ready ? Math.round(state.weather.temperature) : void 0;
  const description = ready ? t(weatherCodeKey(state.weather.weatherCode)) : void 0;
  const place = ready ? state.location.name ?? t("location.unknown") : void 0;
  const summary = ready ? `${place} ${temperature}\xB0 ${description}` : t("locating");
  if (!wide) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        type: "button",
        className: WeatherWidget_default.rail,
        "aria-label": summary,
        title: summary,
        disabled: loading,
        onClick: () => {
          void autoLocate();
        },
        children: temperature !== void 0 ? `${temperature}\xB0` : "\u2014"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.card, children: [
    ready && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WeatherBackdrop, { state: weatherBackdrop(state.weather.weatherCode) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.body, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.head, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.place, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.placeSkeleton, "aria-hidden": "true" }) : place }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: WeatherWidget_default.refresh,
            "aria-label": t("refresh"),
            title: t("refresh"),
            disabled: loading,
            onClick: () => {
              void autoLocate();
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(RefreshIcon, { size: 14, className: loading ? WeatherWidget_default.refreshSpinning : void 0 })
          }
        )
      ] }),
      loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.skeleton, "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.skeletonTemp }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.skeletonLine }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.skeletonLine })
      ] }),
      ready && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.main, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: WeatherWidget_default.temp, children: [
            temperature,
            "\xB0"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.desc, children: description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.details, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("feelsLike", { temp: Math.round(state.weather.apparentTemperature) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("humidity", { value: state.weather.humidity }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("wind", { value: Math.round(state.weather.windSpeed) }) })
        ] })
      ] }),
      state.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.error, role: "alert", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(WarningIcon, { size: 14, className: WeatherWidget_default.errorIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.errorText, children: t(state.message) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: WeatherWidget_default.retry, onClick: () => {
          void autoLocate();
        }, children: t("refresh") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: WeatherWidget_default.search, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        searching && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: WeatherWidget_default.searching, children: t("locating") }),
        !searching && matches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { className: WeatherWidget_default.matches, children: matches.map((city) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        !searching && matches.length === 0 && query.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: WeatherWidget_default.noMatches, children: t("search.empty") })
      ] })
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
