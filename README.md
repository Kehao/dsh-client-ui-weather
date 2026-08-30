# dsh-client-ui-weather

[English](README.en.md) | 中文

一个用于 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI 侧边栏的本地天气卡片：浏览器定位（IP 兜底）、当前天气状况与手动城市搜索 —— 全部基于免 key 的 [Open-Meteo](https://open-meteo.com/) API。

## 功能特性

- **自动定位**：优先浏览器 geolocation，其次 IP 定位（`ipwho.is`、`ipapi.co`），最后手动搜索城市。
- **当前天气**：以公制单位展示温度、天气状况、体感温度、湿度与风速。
- **城市搜索**：从 Open-Meteo geocoding API 中选择一个地点以覆盖定位结果。
- **响应式**：宽侧边栏显示完整卡片，56px 窄栏折叠为温度小按钮。
- **本地化**：通过标准 `t` 座提供 `zh` 与 `en` 两套字典。

## 安装

本包是独立、自包含的 npm 包，构建产物 `lib/` 已提交到仓库，因此从 git 安装开箱即用，**无需任何构建权限**。从 git 主机或本地检出安装：

```sh
# 从 git 主机（固定 commit，避免后续推送静默改变所运行的代码）
dsh plugin --profile demo add github:you/dsh-client-ui-weather#<sha>

# 或从本地检出
dsh plugin --profile demo add /path/to/dsh-client-ui-weather

# 或从打包的 tarball
pnpm pack
dsh plugin --profile demo add ./dsh-client-ui-weather-0.1.0.tgz
```

本包不声明 `prepare` 脚本，因此 pnpm 直接安装仓库中已提交的 `lib/` 产物，永远不会请求构建脚本许可。

### 启用浏览器界面

本包是 *client* 插件（`dsh.client` 声明），而非 `dsh.bundle` 配置层，所以 `dsh plugin add` 只安装依赖、不会自行激活配置层。需要在 profile 的 `cordis.patch.yml`（或 `--patch` overlay）中追加以下内容来加载它：

```yaml
# Local weather card in the sidebar foot (dsh-client-ui-weather plugin).
- insert:
    - id: ui-weather
      name: dsh-client-ui-weather
```

dsh web 的 client-modules 扫描器会拾取任何声明了 `dsh.client` 的已加载条目，因此下次启动 `dsh web` 时，天气卡片会出现在侧边栏底部（设置按钮上方）。

## 数据来源

| 数据 | 来源 | Key |
|---|---|---|
| 当前天气 | [Open-Meteo forecast API](https://open-meteo.com/en/docs) | 无 |
| 城市搜索 | [Open-Meteo geocoding API](https://open-meteo.com/en/docs/geocoding-api) | 无 |
| IP 定位 | `ipwho.is`，其次 `ipapi.co` | 无 |
| 逆地理编码 | [BigDataCloud reverse-geocode-client](https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api) | 无 |

所有请求都是浏览器对带 CORS 响应头的 HTTPS 端点的普通 `fetch` 调用，无需 API key。

## 开发

```sh
pnpm install      # 开发工具链（esbuild、typescript、vitest）
pnpm run build    # 重新构建 lib/（bundle + 类型声明）
pnpm test         # 运行 vitest 测试套件（数据层、WMO 映射、组件、注册）
pnpm run typecheck
```

浏览器 bundle 以 dsh client-modules wire 格式输出（`window.__ModuleLoader__.load({ id, factory })`），CSS Modules 编译为哈希类名映射并注入 style 标签；平台模块（`react`、cordis、slots 等）保持外部依赖，由宿主 shell 解析。

### UI 调试（React + Vite）

`dev/` 目录提供了一个独立的 Vite + React 调试台，在浏览器中直接渲染真实的 `WeatherWidget`，无需 dsh 宿主：

```sh
pnpm dev          # 启动 http://localhost:5173
pnpm run dev:build  # 生产构建检查
```

调试台控制面板支持：

- **场景切换**：晴天北京 / 雨天上海 / 雪天哈尔滨（mock 定位与天气数据，无网络请求）
- **宽度切换**：宽栏卡片与 56px 窄栏温度胶囊
- **语言切换**：中文 / English（复用真实 locale 字典）
- **错误模式**：定位失败 / 天气获取失败，验证错误态与重试

mock 数据位于 `dev/mock.ts`，注入面与真实插件一致（`resolveLocation` / `fetchWeather` / `searchCity`），组件代码零改动即可调试。

## 模型体验

无，天气卡片是浏览器端 UI 插件层，不注册任何模型可见内容。

#### KV Cache 影响

无；本包既不组装也不发送任何 provider 请求。

## 已知限制与待办

以下限制定义了当前的天气词表。它们是当前的包约束，而非任务积压。

- IP 定位服务是有速率限制的第三方；当 `ipwho.is` 与 `ipapi.co` 都返回失败时，卡片展示位置错误并依赖城市搜索。
- 每次页面加载都会弹出定位授权提示，除非浏览器记住了选择；卡片不会跨刷新持久化用户选中的城市。
- 只展示当前状况；不渲染小时/日预报。
- 所有测量值均按 Open-Meteo 返回的公制单位（°C、km/h、%）展示，无单位切换。
- 本插件面向 dsh web 侧边栏的 `sidebar.footer.action` 插槽；要求宿主中存在官方的 `ui-sidebar` 与 `ui-renderer` client 包。

### 开发备注

数据层、WMO 映射与组件分别由 node 环境数据 spec 与 jsdom 组件 spec 覆盖；注册 spec 通过服务替身驱动 apply 契约（dsh monorepo 的 test-runtime 包未完整发布到 npm）。测试中不发起任何网络请求。

## 许可证

MIT
