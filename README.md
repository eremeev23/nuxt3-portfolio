# eremeev.dev — portfolio

Personal site of Maksim Eremeev. Nuxt 4 (SSR) · Vue 3 · TypeScript · UnoCSS (presetWind4) · @nuxtjs/i18n, deployed on Vercel.

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

Runs on http://localhost:3000.

## Checks

```bash
bun run lint
bun run typecheck
```

## Tests

```bash
bun run test         # all Vitest projects (unit + nuxt), single run
bun run test:unit    # only the `unit` project
bun run test:watch   # Vitest in watch mode
bun run test:e2e     # Playwright e2e (desktop 1440 + mobile 390, Chromium)
```

Where tests live:

- `test/unit/` — plain TypeScript (utils, mappers, filters), Node environment.
- `test/nuxt/` — components and composables in the Nuxt environment (`mountSuspended`, `mockNuxtImport`, `registerEndpoint` from `@nuxt/test-utils`), on happy-dom.
- `test/e2e/` — Playwright specs.

`test:e2e` builds the app and serves it with `nuxt preview` on port 3100 before running the specs, so it takes a while. Install the browser once locally first:

```bash
bunx playwright install chromium
```

## Production

```bash
bun run build
bun run preview
```

## Editing content

Page copy lives in `server/content/en/` and `server/content/ru/` (not yet wired to the redesigned pages). UI strings (buttons, labels, error messages) live in `i18n/locales/en.json` and `ru.json`.
