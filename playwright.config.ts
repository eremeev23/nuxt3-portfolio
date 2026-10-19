import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

/*
 * e2e runs against the production build: webServer does `nuxt build` and then
 * `nuxt preview`, and the @nuxt/test-utils fixture points at that server via
 * `host` instead of building its own copy per worker.
 */
const port = 3100
const host = `http://localhost:${port}`

export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'html',
  use: {
    baseURL: host,
    trace: 'on-first-retry',
    nuxt: { host },
  },
  webServer: {
    command: `bun run build && bun run preview --port ${port}`,
    url: host,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  // Chromium only, at the two widths the design is drawn for.
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
})
