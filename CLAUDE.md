# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

The package manager is **bun** (`packageManager` in `package.json`); the lockfile is `bun.lock`. There is no `yarn.lock` or `package-lock.json` — do not reintroduce them.

```bash
bun install           # postinstall runs `nuxt prepare` (regenerates .nuxt/tsconfig.*.json)
bun run dev           # dev server on http://localhost:3000
bun run build         # SSR build (Nitro node-server preset; Vercel picks its own)
bun run generate      # static prerender
bun run preview       # serve the production build locally
bun run typecheck     # nuxt typecheck (vue-tsc)
bun run lint          # eslint . — lints and checks formatting; errors must stay at zero
bun run lint:fix      # also the formatter: there is no Prettier
bun run test          # Vitest, single run: `unit` (test/unit, node) + `nuxt` (test/nuxt, Nuxt env on happy-dom)
bun run test:unit     # only the `unit` project
bun run test:watch    # Vitest in watch mode
bun run test:e2e      # Playwright (test/e2e): builds, serves via `nuxt preview` on :3100, Chromium desktop 1440 + mobile 390
```

`bun run lint`, `bun run typecheck`, `bun run test` and `bun run build` are the gates; all pass on a clean tree. CI (`.github/workflows/ci.yml`) runs them on every push and pull request after `bun install --frozen-lockfile`, with e2e in a separate parallel job that uploads `playwright-report/` on failure. Locally, e2e needs `bunx playwright install chromium` once.

ESLint is also the formatter, same setup as the easy-lesson and NRIZ projects: `eslint.config.mjs` wraps `@antfu/eslint-config` (`typescript`, `unocss`, `formatters` via `eslint-plugin-format`) in the Nuxt config, and `nuxt.config.ts` sets `eslint.config: { standalone: false, stylistic: true }` so the two don't fight. Style is single quotes, no semicolons, 2 spaces, trailing commas, `max-len` 120 (warning), one attribute per line in multiline templates, `type` over `interface`, separate `import type`, `curly: all`, starred-block multiline comments. `no-console` is off unless `LINT_CONFIG_STRICT_CONSOLE=true`. The long copy strings in `server/content/` trip `max-len` as warnings; that is known and fine. Do not add Prettier back — `.vscode/settings.json` disables it and fixes on save through ESLint.

On Windows, WebStorm's UnoCSS plugin keeps a native `.node` binary in `node_modules` open, which can make a reinstall fail with `EPERM`; close the IDE (or that plugin's node process) before a clean install.

## Stack

Nuxt 4 (SSR) · Vue 3.5 · TypeScript 6 · UnoCSS 66 (presetWind4) · @nuxtjs/i18n 10 · @nuxt/fonts. Personal portfolio for Maksim Eremeev, deployed on Vercel. No database, no CMS.

Directory layout is the Nuxt 4 default: app code in `app/`, Nitro code in `server/`, code shared between them in `shared/` (aliased `#shared`), i18n assets in `i18n/`.

## Architecture

### Redesign in progress

The pre-redesign UI (pages, components, layouts, stores, the content API) has been deleted; it lives on in git history. The app is currently a minimal shell: `app/app.vue` (locale-aware head, `<NuxtPage />`) and a placeholder `app/pages/index.vue` whose heading comes from the `placeholder.*` locale keys. New pages and components land on top of that.

### Content lives in `server/content/`

All page copy is hardcoded as typed TS objects in `server/content/en/` and `server/content/ru/` — four modules each (`header`, `mainPage`, `projects`, `contacts`). `server/content/index.ts` assembles them into `Record<LocaleCode, ContentBundle>`, which is what type-checks the content against `shared/types/index.ts`. Nothing serves it yet: the old `server/api/[locale]/[section].get.ts` route and the `useContent` composable that fetched it were removed with the old UI, so the redesign has to wire up its own fetching path.

**Editing site copy means editing `server/content/`, and any change must be made in both locale trees** — the `ContentBundle` type will not catch a translation you forgot to write, only a shape you broke.

### Locale is owned by @nuxtjs/i18n

`useI18n().locale` is the single source of truth; codes are `ru` / `en`. Strategy is `prefix_except_default` with **`ru` as the default**: Russian lives at the bare paths (`/`, `/projects`), English under `/en` (`/en`, `/en/projects`). The choice is persisted in the `i18n_locale` cookie; on a first visit to `/` the browser language is detected (`redirectOn: 'root'`), so an English browser is redirected to `/en`. A locale switcher should call `setLocale`, which navigates to the same page in the other locale.

**Internal links must be `<NuxtLinkLocale>`** (or go through `useLocalePath()`), never a bare `<nuxt-link to="/…">` — a bare link would drop an English visitor back onto the Russian path. External links stay plain `<a>` / `<nuxt-link>`.

SEO per locale is set once in `app/app.vue`: `useLocaleHead()` supplies `<html lang>`, hreflang alternates, canonical and `og:locale` (absolute, because `i18n.baseUrl` is set), and `useSeoMeta` adds the translated description and og tags. `titleTemplate` appends the translated site name, so pages pass only their own title (`useHead({ title: () => t('meta.projects') })`).

Two kinds of text, two mechanisms:

- **Content** (nav labels, project descriptions, career entries) comes from `server/content/`.
- **UI chrome** (page titles, meta description, form labels, error messages, alt text, aria-labels, footer) comes from `i18n/locales/{ru,en}.json` via `t()` / `$t()` — no user-visible string is hardcoded in a component. Add every key to both files. `i18n/i18n.config.ts` wires in the datetime formats and plural rules from `i18n/utils/`.

Adding a visible string means deciding which of the two it belongs to. In locale JSON, `|`, `@`, `{` and `}` are vue-i18n syntax (plural separator, linked message, interpolation) — keep them out of plain text or escape them as `{'|'}`.

### Styling — UnoCSS, config-first

Two files make up the design system. `app/assets/css/tokens.css` holds every colour value plus `--b` (2px border) and the font stacks `--f-display` / `--f-mono`. `uno.config.ts` at the project root maps theme colours and fonts onto those variables and owns the type scale, breakpoints, the `blink` keyframes, the shortcuts and the three custom utilities. `app/assets/css/main.css` holds only base styles (body, `:focus-visible`) and should not gain tokens. There is no `tailwind.config.ts` and no `@theme` block — Tailwind was removed in favour of UnoCSS.

Design rules: 2px borders, no radius, no shadows, one accent, no hardcoded colours in components.

The preset is **`presetWind4`**, so utility names are the Tailwind 4 ones (`bg-*`, `text-*`, `lg:`, `dark:`, arbitrary values). Theme keys, however, are UnoCSS's: `colors`, `font`, `text`, `breakpoint`, `animation` — partial objects that deep-merge over the preset's defaults, so overriding `breakpoint.lg` leaves `sm`/`md`/`xl` intact.

Two things in `nuxt.config.ts` are load-bearing:

- `unocss: { wind3: false }` — the Nuxt module builds a preset list from its own flags and **concatenates** it with the config file's, so the default `wind3: true` would register presetWind3 alongside presetWind4.
- No `postcss` block. Nuxt's default `postcss-import` and `autoprefixer` are fine here; the Tailwind-era overrides that disabled them are gone.

**`@apply` works in every `<style>` block with no preamble.** `transformerDirectives()` handles it, so the `@reference "…/main.css"` line each SFC used to need has been deleted — do not reintroduce it.

#### Colours

Values live only in `tokens.css`: **dark on `:root`** (the default), **light on `.light`**. `@nuxtjs/color-mode` (`preference`/`fallback: 'dark'`, `classSuffix: ''`) puts `.dark` or `.light` on `<html>`; presetWind4's `dark:` variant keys off `.dark`. Each theme colour in `uno.config.ts` is `var(--…)`, so `bg-surface` or `text-muted` needs no `dark:` variant. Nothing toggles the theme yet.

| utility                    | variable                  | dark      | light     |                                    |
| -------------------------- | ------------------------- | --------- | --------- | ---------------------------------- |
| `bg`                       | `--bg`                    | `#101216` | `#f4f2ec` | page                               |
| `fg`                       | `--fg`                    | `#f2f3f4` | `#101216` | body text                          |
| `line`                     | `--line`                  | `#22262c` | `#101216` | rules and borders                  |
| `muted`                    | `--muted`                 | `#9aa1aa` | `#5f636a` | labels, captions                   |
| `text2`                    | `--text-2`                | `#c3c8ce` | `#3f434a` | supporting text                    |
| `surface` / `surface2`     | `--surface` / `--surface-2` | `#191c21` / `#14171b` | `#e6e3da` / `#ece9e1` | cards, chips, stripes |
| `ph` / `wave`              | `--ph` / `--wave`         | `#4d545d` / `#2b3038` | `#8b8f95` / `#cfcabd` | placeholder art     |
| `accent` / `onAccent`      | `--accent` / `--on-accent` | `#e8722c` / `#101216` | `#c2410c` / `#ffffff` | accent as text, mark, button |
| `fill` / `onFill`          | `--fill` / `--on-fill`    | `#c2410c` / `#ffffff` | `#c2410c` / `#ffffff` | filled bands: marquee, CTA |
| `navLine`                  | `--nav-line`              | `#e8722c` | `#c2410c` | active nav rule                    |

Colour utilities use the camelCase key (`text-onAccent`, `bg-surface2`); the kebab form does not resolve. Hand-written CSS references the variables directly. `accent` brightens on dark; `fill` is `#c2410c` in both themes.

`test/unit/tokens.test.ts` parses `tokens.css` (one declaration per line) and checks that both themes define the same tokens and that the pairs in use meet WCAG AA (4.5:1 body, 3:1 large).

#### Shortcuts and primitives

Shortcuts in `uno.config.ts`: `brut` (2px line border), `h-page` (page-title type), `label` (mono 11px caption), `btn-acc`, `stripe` (hatched placeholder). Primitives live in `app/components/ui/`: `BrutButton` (`accent` / `line` / `white`; a `<NuxtLinkLocale>` when `to` is set, else `<button>`), `Chip`, `Pill`, `Label`, `Stripe`, `SectionTitle`, `PageTitle` (accent dot, `xl` / `xxl`), `CtaBand` (`title` / `side` slots), `TheMarquee` (CSS loop, pauses on hover, off under `prefers-reduced-motion`), `AppLogo`. Interactive ones keep a 44px minimum height (`min-h-11`); focus is a 2px accent outline from `main.css`.

#### Cascade

`main.css` keeps its base rules inside `@layer base`. UnoCSS emits utilities **unlayered**, and unlayered CSS beats every layer regardless of specificity — so the layer is what stops the base `body` rule from silently overriding every utility that sets colour. Keep new base styles inside it.

Custom utilities with no theme namespace (`grid-cols-custom`, `grid-cols-custom-5`, `list-square`) are plain entries in the config's `rules` array.

### Typography

Two families, self-hosted by `@nuxt/fonts` (the `fonts` block in `nuxt.config.ts` downloads them from Google Fonts at build time; normal style only, Latin + Cyrillic subsets). They are declared `global: true` rather than left to auto-detection, because the `font-family` declarations live in `tokens.css` and UnoCSS-generated CSS:

- **`font-display` → Archivo** — names, headings, body copy. Weights in use: 900 (large names and figures), 800 (small caps labels), 500 (lead paragraphs), 400 (body).
- **`font-mono` → JetBrains Mono** — the technical layer: nav, stack tags, dates, captions, footer. Weights: 800 (nav, badges), 500, 400.

**Archivo has no Cyrillic subset** (Latin / Latin-ext / Vietnamese only — verified against the Google Fonts API). Every Russian string on the site therefore renders in the next family in the `--f-display` stack, currently Inter. That is a deliberate fallback, not an oversight: do not "simplify" the stack down to `'Archivo', sans-serif`, or Russian copy drops to a system font and the two locales stop matching. JetBrains Mono does ship Cyrillic, so the technical layer is fine in both languages.

The scale lives in the config's `text` map, so each utility carries size, line-height and tracking together — `text-hero` alone is 112px / 0.86 / -0.05em:

| token                              | size      | notes                            |
| ---------------------------------- | --------- | -------------------------------- |
| `text-hero`                        | 112px     | hero name; tracking -0.05em      |
| `text-title`                       | 88px      | page titles                      |
| `text-section`                     | 26px      | section headings (CAREER, STACK) |
| `text-lead`                        | 19px      | lead paragraphs, weight 500      |
| `text-body` / `text-body-sm`       | 15 / 14px | body copy                        |
| `text-caption` / `text-caption-sm` | 12 / 11px | mono captions; tracking +0.04em  |

Sizes and the hero tracking come from the design spec. Line heights and the caption tracking were measured off the artboard (a 3x export of a ~1333px layout); `text-title`'s tracking is carried over from the hero rather than measured, so tune it against a real page title.

@nuxt/fonts also generates metric-adjusted fallback faces (`Archivo Fallback: Inter`, …), which keep the Cyrillic fallback from shifting layout. There is no SCSS in the project; styles are UnoCSS utilities plus plain CSS.

### Components and assets

Components are imported explicitly by path rather than relying on auto-import; composables are auto-imported. Images go through `<nuxt-img>` with the `default` preset (webp, quality 100) declared in `nuxt.config.ts`; project screenshots and the favicons live in `public/`. There is no icon module or carousel library — `nuxt-icons` and `nuxt-swiper` were removed with the old UI.

### Site URL

`https://eremeev-dev.vercel.app` appears in `nuxt.config.ts` three times — `runtimeConfig.public.siteUrl`, `site.url` (which `@nuxtjs/sitemap` reads) and `i18n.baseUrl` (which makes hreflang/canonical links absolute). All honour `NUXT_PUBLIC_SITE_URL`.

### Claude Code setup

`.claude/settings.json` (committed) registers the `addy-agent-skills` marketplace (GitHub `eremeev23/agent-skills`) and enables the `agent-skills@addy-agent-skills` plugin — the same setup as the easy-lessons repo. `.claude/launch.json` starts the dev server with `bun run dev`.
