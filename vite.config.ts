/**
 * Vite dev server config for the plugin UI playground. Serves the weather
 * card standalone with stubbed location/weather inputs, so the component can
 * be iterated without a dsh host. Run `pnpm dev`.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'dev',
  build: {
    outDir: '../dev-dist',
  },
  server: {
    port: 5173,
  },
})
