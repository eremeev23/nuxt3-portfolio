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

## Production

```bash
bun run build
bun run preview
```

## Editing content

Page copy lives in `server/content/en/` and `server/content/ru/` (not yet wired to the redesigned pages). UI strings (buttons, labels, error messages) live in `i18n/locales/en.json` and `ru.json`.
