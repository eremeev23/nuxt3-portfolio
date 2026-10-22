# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

The package manager is **bun** (`packageManager` in `package.json`); the lockfile is `bun.lock`. There is no `yarn.lock` or `package-lock.json` — do not reintroduce them.

```bash
bun install           # postinstall runs `nuxt prepare` (regenerates .nuxt/tsconfig.*.json)
bun run dev           # dev server on http://localhost:5000 (`--port 5000` in package.json)
bun run build         # SSR build (Nitro node-server preset; Vercel picks its own)
bun run generate      # static prerender
bun run preview       # serve the production build locally
bun run typecheck     # nuxt typecheck (vue-tsc)
bun run lint          # eslint . — lints and checks formatting; errors must stay at zero
bun run lint:fix      # also the formatter: there is no Prettier
bun run test          # Vitest, single run: `unit` (test/unit, node) + `nuxt` (app/**/*.test.ts, Nuxt env on happy-dom)
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

All page copy is hardcoded as typed TS objects in `server/content/en/` and `server/content/ru/`; only `ru` and `en` have their own tree; `server/content/index.ts` points the other seven locales at the English bundle — four modules each (`header`, `mainPage`, `projects`, `contacts`). `server/content/index.ts` assembles them into `Record<LocaleCode, ContentBundle>`, which is what type-checks the content against `shared/types/index.ts`. Only the contacts are served so far (`server/api/contacts.get.ts`, used by the mobile menu): the old `server/api/[locale]/[section].get.ts` route and the `useContent` composable that fetched it were removed with the old UI, so the redesign has to wire up its own fetching path.

**Editing site copy means editing `server/content/`, and any change must be made in every locale tree** — the `ContentBundle` type will not catch a translation you forgot to write, only a shape you broke.

### Locale is owned by @nuxtjs/i18n

`useI18n().locale` is the single source of truth; codes are `ru`, `en`, `cs`, `sr` (Serbian, Latin script, `sr-Latn`), `es`, `de`, `pt` (European, `pt-PT`), `it` and `fr`, listed in `LOCALE_CODES` (`shared/types`) and the `i18n.locales` block. Strategy is `prefix_except_default` with **`ru` as the default**: Russian lives at the bare paths (`/`, `/projects`), the others under their prefix (`/en/projects`, `/cs`, `/de`, …). The choice is persisted in the `i18n_locale` cookie; on a first visit to `/` the browser language is detected (`redirectOn: 'root'`), so an English browser is redirected to `/en`. The switcher is `LocaleSelector` (on the generic `Selector`, with `trigger` / `option` slots): its trigger is the current locale's `PixelFlag` (a hand-drawn 20×12 pixel-art SVG per locale — UK flag for `en`, Portugal for `pt`; Serbian, Spanish and Portuguese arms reduced to pixel blobs), the options are flag + code + native name; it calls `setLocale`, which loads the messages, writes the cookie and navigates to the same page in the other locale. Never assign `locale.value` directly — that changes the strings but not the URL or the cookie, so a reload drops back to the old locale.

**Internal links must be `<NuxtLinkLocale>`** (or go through `$p` / `useLocalePath()`), never a bare `<nuxt-link to="/…">` — a bare link would drop an English visitor back onto the Russian path. `$p(route, locale?)` is provided by `app/plugins/locale-path.ts`: `$p('/projects')` in templates, `const { $p } = useNuxtApp()` in scripts. It is a plugin, not a util, because it must not call composables per call — a helper that ran `useI18n()` inside threw "Must be called at the top of a `setup` function" from any `computed` re-run on a locale change. Anything derived from the locale (labels, paths) in a component that survives route changes — the header, the layout — must be a `computed`, not a setup-time constant. External links stay plain `<a>` / `<nuxt-link>`.

SEO per locale is set once in `app/app.vue`: `useLocaleHead()` supplies `<html lang>`, hreflang alternates, canonical and `og:locale` (absolute, because `i18n.baseUrl` is set), and `useSeoMeta` adds the translated description and og tags. `titleTemplate` appends the translated site name, so pages pass only their own title (`useHead({ title: () => t('meta.projects') })`).

Two kinds of text, two mechanisms:

- **Content** (nav labels, project descriptions, career entries) comes from `server/content/`.
- **UI chrome** (page titles, meta description, form labels, error messages, alt text, aria-labels, footer) comes from `i18n/locales/<code>.json` (nine files) via `t()` / `$t()` — no user-visible string is hardcoded in a component. Add every key to all nine files; `test/unit/locales.test.ts` fails if their key sets differ or a locale is missing from `locales.*`. `i18n/i18n.config.ts` wires in the datetime formats and plural rules from `i18n/utils/` (three-form rules for `ru`, `cs`, `sr`; `fr` counts 0 as singular) and the fallback chain: every locale except `ru` and `en` falls back to `en`, those two to `ru`.

In templates use the global `$t()`; do not add `const { t } = useI18n()` just to translate in the template. Keep `useI18n()`'s `t` only where the script needs a translation (a `computed`, `useHead`/`useSeoMeta`, a composable like `useNavPages`), or destructure it alongside `locale` / `setLocale` when those are needed anyway. Both re-render on a locale switch.

Adding a visible string means deciding which of the two it belongs to. In locale JSON, `|`, `@`, `{` and `}` are vue-i18n syntax (plural separator, linked message, interpolation) — keep them out of plain text or escape them as `{'|'}`.

### Styling — UnoCSS, config-first

Two files make up the design system. `app/assets/css/tokens.css` holds every colour value plus `--b` (3px border width, the single source for every structural border) and the font stacks `--f-display` / `--f-mono`. `uno.config.ts` at the project root maps theme colours and fonts onto those variables and owns the type scale, breakpoints, the `blink` keyframes, the shortcuts and the three custom utilities. `app/assets/css/main.css` holds only base styles (body, `:focus-visible`) and should not gain tokens. There is no `tailwind.config.ts` and no `@theme` block — Tailwind was removed in favour of UnoCSS.

Design rules: `--b` (3px) borders, no radius, no shadows, one accent, no hardcoded colours in components.

The preset is **`presetWind4`**, so utility names are the Tailwind 4 ones (`bg-*`, `text-*`, `lg:`, `dark:`, arbitrary values). Theme keys, however, are UnoCSS's: `colors`, `font`, `text`, `breakpoint`, `animation` — partial objects that deep-merge over the preset's defaults, so overriding `breakpoint.lg` leaves `sm`/`md`/`xl` intact.

Two things in `nuxt.config.ts` are load-bearing:

- `unocss: { wind3: false }` — the Nuxt module builds a preset list from its own flags and **concatenates** it with the config file's, so the default `wind3: true` would register presetWind3 alongside presetWind4.
- No `postcss` block. Nuxt's default `postcss-import` and `autoprefixer` are fine here; the Tailwind-era overrides that disabled them are gone.

**`@apply` works in every `<style>` block with no preamble.** `transformerDirectives()` handles it, so the `@reference "…/main.css"` line each SFC used to need has been deleted — do not reintroduce it.

#### Colours

Values live only in `tokens.css`: **dark on `:root`** (the default), **light on `.light`**. `@nuxtjs/color-mode` (`preference`/`fallback: 'dark'`, `classSuffix: ''`) puts `.dark` or `.light` on `<html>`; presetWind4's `dark:` variant keys off `.dark`. Each theme colour in `uno.config.ts` is `var(--…)`, so `bg-surface` or `text-muted` needs no `dark:` variant. Nothing toggles the theme yet.

| utility                    | variable                  | dark      | light     |                                    |
| -------------------------- | ------------------------- | --------- | --------- | ---------------------------------- |
| `bg`                       | `--bg`                    | `#101216` | `#ede6d4` | page                               |
| `fg`                       | `--fg`                    | `#f2f3f4` | `#101216` | body text                          |
| `line`                     | `--line`                  | `#22262c` | `#101216` | rules and borders                  |
| `muted`                    | `--muted`                 | `#9aa1aa` | `#585c63` | labels, captions                   |
| `text2`                    | `--text-2`                | `#c3c8ce` | `#3f434a` | supporting text                    |
| `surface` / `surface2`     | `--surface` / `--surface-2` | `#191c21` / `#14171b` | `#dfd7c1` / `#e6dfcb` | cards, chips, stripes |
| `ph` / `wave`              | `--ph` / `--wave`         | `#4d545d` / `#2b3038` | `#8b8f95` / `#cbc2aa` | placeholder art     |
| `accent` / `onAccent`      | `--accent` / `--on-accent` | `#d4561a` / `#101216` | `#d4561a` / `#101216` | the one orange: marks, fills (buttons, marquee, CTA, hire, logo D, active nav bar / menu row), large text |
| `accentText`               | `--accent-text`           | `#d4561a` | `#101216` | small text meant to read as accent |

Colour utilities use the camelCase key (`text-onAccent`, `bg-surface2`); the kebab form does not resolve. Hand-written CSS references the variables directly. There is **one orange**, `accent` (`#d4561a`, the same in both themes); anything filled with it carries dark `onAccent` text (4.59:1; white would be 4.08). On the light cream `bg` the accent is only 3.28:1, enough for large text (≥24px, or ≥18.66px bold) and marks, not for small text — so small text that should look accent uses `text-accentText`, which is the accent in dark and `fg` in light. The light `bg` is a warm cream, deliberately not near-white.

`test/unit/tokens.test.ts` parses `tokens.css` (one declaration per line) and checks that both themes define the same tokens and that the pairs in use meet WCAG AA (4.5:1 body, 3:1 large).

#### Shortcuts and primitives

Shortcuts in `uno.config.ts`: `brut` (`--b` line border), `h-page` (page-title type), `label` (mono 11px caption), `btn-acc`, `stripe` (hatched placeholder), `gut` (page gutter: 28px, 16px at ≤700px, safe-area aware), `nav-cell` / `nav-hire` (header cells: full height, `--b` left rule; the type — mono 800 12px caps, tracking .06em — is set once on the header `.hdr` and inherited). Primitives live in `app/libs/App/components/` (auto-imported by file name, see below): `Btn` (`accent` / `line` / `white`; a `<NuxtLinkLocale>` when `to` is set, else `<button>`), `Chip`, `Pill`, `Label`, `Stripe`, `SectionTitle`, `PageTitle` (accent dot, `xl` / `xxl`), `CtaBand` (`title` / `side` slots), `TheMarquee` (CSS loop, pauses on hover, off under `prefers-reduced-motion`), `AppLogo`, `InfoBlock`. Interactive ones keep a 44px minimum height (`min-h-11`); focus is a 2px accent outline from `main.css`.

#### Header and mobile menu

`Header` holds the bar; the section links come from `useNavPages()` (`app/libs/App/composables`), shared with `MobileMenu` and the error page. Each page carries an `active` flag computed from the route (`/projects/[id]` keeps PROJECTS active — the router's `router-link-active` would not, since the two routes are siblings); style the `--active` modifier and set `aria-current="page"`, never key off `router-link-active`. Breakpoints are the design's, as SCSS variables in `Header.vue`: at ≤980px the page links give way to a burger, the language selector shows only its flag (no arrow), and the theme button drops its label (sun/moon SVG only, label kept as `sr-only` + `title`); the three icon buttons are squares of the bar height (`--bar`: 50px, 46px at ≤520px — set explicitly because `aspect-ratio` does not survive flex intrinsic sizing) with 20px icons drawn at the `--b` weight. At ≤520px the bar compacts (11px type, 16px logo) and `HIRE ME` moves from the bar into the menu (logo + three squares + it would not fit at 375px). The burger opens `MobileMenu`, a modal dialog teleported to `<body>` and placed under the header (`--header-h`, measured by the header), so the burger stays on top, morphs into an ✕ on a fill cell and is the close control (`menu.open` / `menu.close` aria-labels). The menu has big numbered section rows (active row filled), email and socials (from `/api/contacts`, fetched client-side and lazily), the marquee, and, on phones, the `HIRE ME` row. Tab cycles through the burger and the menu, Esc, the burger, a link or any route change close it, page scroll is locked, and focus returns to the burger. Under `prefers-reduced-motion` the burger morph and the menu slide are instant / fade only. `Header/Header.test.ts`, `BurgerButton/BurgerButton.test.ts`, `ThemeToggle/ThemeToggle.test.ts` and `test/e2e/mobile-menu.spec.ts` / `theme.spec.ts` cover it.

`server/api/contacts.get.ts` (`?locale=`) is the first route serving `server/content/`; it returns that locale's contact links.

#### Cascade

`main.css` keeps its base rules inside `@layer base`. UnoCSS emits utilities **unlayered**, and unlayered CSS beats every layer regardless of specificity — so the layer is what stops the base `body` rule from silently overriding every utility that sets colour. Keep new base styles inside it.

#### Page transitions

`app.pageTransition` (`name: 'page'`, `mode: 'out-in'`) in `nuxt.config.ts`, styled in `app/assets/css/transitions.css` (unlayered, so it beats utilities on a page root): leave 0.3s lifts up 24px and scales to 0.96, enter 0.45s rises from 48px below, easing `cubic-bezier(.645,.045,.355,1)`, the motion the pre-redesign site used. Under `prefers-reduced-motion: reduce` it is a 0.15s opacity fade with no transform. `html { scrollbar-gutter: stable }` in `main.css` stops the sideways jump when a route change toggles the scrollbar. **Every page needs a single root element**; a page with an empty or multi-root template is not animated (Vue's `<Transition>` needs an element).

Custom utilities with no theme namespace (`grid-cols-custom`, `grid-cols-custom-5`, `list-square`) are plain entries in the config's `rules` array, as is `bw` / `bw-{t,r,b,l,x,y}`: border width from `--b`. **Never write `border-2` / `b-l-2` or a literal px border** — use `bw…` (or `brut`) plus `b-solid` and a colour, so changing `--b` reweights every border. The focus outline is deliberately a literal 2px, and the active nav bar is 5px so it stays heavier than the rules.

### Typography

Two families, self-hosted by `@nuxt/fonts` (the `fonts` block in `nuxt.config.ts` downloads them from Google Fonts at build time; normal style only, Latin + Cyrillic subsets). They are declared `global: true` rather than left to auto-detection, because the `font-family` declarations live in `tokens.css` and UnoCSS-generated CSS:

- **`font-display` → Archivo** — names, headings, body copy. Weights in use: 900 (large names and figures), 800 (small caps labels), 500 (lead paragraphs), 400 (body).
- **`font-mono` → JetBrains Mono** — the technical layer: nav, stack tags, dates, captions, footer. Weights: 800 (nav, badges), 500, 400.

**Archivo has no Cyrillic subset** (Latin / Latin-ext / Vietnamese only — verified against the Google Fonts API). Every Russian string on the site therefore renders in the next family in the `--f-display` stack, currently Inter. That is a deliberate fallback, not an oversight: do not "simplify" the stack down to `'Archivo', sans-serif`, or Russian copy drops to a system font and the two locales stop matching. JetBrains Mono does ship Cyrillic, so the technical layer is fine in both languages.

The scale lives in the config's `text` map, so each utility carries size, line-height and tracking together — `text-hero` alone is 112px / 0.86 / -0.05em:

| token                              | size      | notes                            |
| ---------------------------------- | --------- | -------------------------------- |
| `text-hero`                        | 56 → 112px, `clamp(…, 9.4vw, …)` | hero name; tracking -0.05em      |
| `text-title`                       | 40 → 88px, `clamp(…, 7.4vw, …)`  | page titles                      |
| `text-section`                     | 22 → 26px | section headings (CAREER, STACK) |
| `text-lead`                        | 16 → 19px, `clamp(…, 1.6vw, …)`  | lead paragraphs, weight 500      |
| `text-body` / `text-body-sm`       | 15 / 14px | body copy                        |
| `text-caption` / `text-caption-sm` | 12 / 11px | mono captions; tracking +0.04em  |

The four display/lead sizes are fluid `clamp()`s (as in the design): the max is the desktop size, reached by ~1190px, so desktop is unchanged; the min is the phone size. Body and caption sizes are fixed (body never below 15px, mono never below 11px). `h1`–`h3` get `overflow-wrap: anywhere` in `main.css`, so a long word at display size wraps instead of widening the page. Buttons (`Btn`, `btn-acc`) tighten to 13px / 16px padding at ≤520px and keep `min-h-11`. Sizes and the hero tracking come from the design spec. Line heights and the caption tracking were measured off the artboard (a 3x export of a ~1333px layout); `text-title`'s tracking is carried over from the hero rather than measured, so tune it against a real page title.

@nuxt/fonts also generates metric-adjusted fallback faces (`Archivo Fallback: Inter`, …), which keep the Cyrillic fallback from shifting layout. Styles are UnoCSS utilities first. SCSS is supported (`sass-embedded`, dev dependency, Vite's modern compiler API): `<style lang="scss">` in SFCs and `.scss` files under `app/assets/` both work, with no global `additionalData` — import partials explicitly with `@use '~/assets/…'`. Reach for it only when a block genuinely needs nesting, variables, maps, mixins or `sass:math`; plain `<style>` stays the default. UnoCSS `@apply` (including custom rules like `bw`) works inside SCSS blocks, because `transformerDirectives()` runs before Sass. Colours still come from the CSS variables in `tokens.css`, never from Sass variables. ESLint formats SCSS blocks too (`formatters`).

### Components and assets

Everything is auto-imported; do not add `import X from '~/libs/…'` in app code. Feature code is grouped into libs: `app/libs/<Lib>/{components,composables,utils,functions,types}` (only `App` exists so far). The `components` and `imports` blocks in `nuxt.config.ts` register them:

- **Components** — `app/libs/*/components/**/*.vue` with `pathPrefix: false`, so the tag is the bare file name (`libs/App/components/BrutButton/BrutButton.vue` → `<BrutButton>`, also `<LazyBrutButton>`). **Every component has its own folder** named after it: `<Name>/<Name>.vue`, its test `<Name>/<Name>.test.ts`, and anything else it owns (`Selector/types/`, SCSS partials). Names must be unique across all libs; Nuxt warns on a clash. `app/components/` (if created) keeps Nuxt's default path-prefixed naming.
- **Functions / composables / utils** — `imports.dirs` scans `app/composables/**`, `app/utils/**`, `app/types/**` and `app/libs/*/{composables,utils,functions,types}/**`, on top of Nuxt 4's defaults (`shared/utils`, `shared/types`, top-level `app/composables`, `app/utils`). Only **named** exports are registered (no default exports); composables start with `use`, plain helpers go to `utils/` (or the existing `functions/`).
- **Types** — exported `type`s from those dirs (and `shared/types`) are declared globally in `.nuxt/types/imports.d.ts`, so `LocaleCode`, `Project` etc. need no import in `app/`. `server/` and the node-side unit tests still import explicitly (`#shared/types`, relative paths).

New shared helper → `app/libs/<Lib>/utils/`; new composable → `app/libs/<Lib>/composables/useX.ts`; new types → `app/libs/<Lib>/types/` or, if the server needs them too, `shared/types/`. After adding a dir or file, `bun run postinstall` (`nuxt prepare`) refreshes the generated declarations for the IDE/typecheck.

Tests live next to the code they cover, so editing a component puts its test in front of you: `Header/Header.test.ts`, `functions/useRandomUtils.test.ts`. Every `app/**/*.{test,spec}.ts` runs in the Vitest `nuxt` project (Nuxt environment, happy-dom) and gets the same auto-imports; to mount a component import it from `#components` (`import { BrutButton } from '#components'`) rather than by path. Nuxt's default `ignore` already skips `*.test.ts` / `*.spec.ts`, so they never reach auto-imports, `.nuxt/components.d.ts` or the build, but they are in the app tsconfig and get typechecked. Do not put test files inside `app/pages/` (they would be ignored as routes but are confusing there). Only cross-cutting checks stay in `test/`: `test/unit` (plain node — `locales.test.ts`, `tokens.test.ts`, relative imports) and `test/e2e` (Playwright).

Images go through `<nuxt-img>` with the `default` preset (webp, quality 100) declared in `nuxt.config.ts`; project screenshots and the favicons live in `public/`. There is no icon module or carousel library — `nuxt-icons` and `nuxt-swiper` were removed with the old UI.

### Site URL

`https://eremeev-dev.vercel.app` appears in `nuxt.config.ts` three times — `runtimeConfig.public.siteUrl`, `site.url` (which `@nuxtjs/sitemap` reads) and `i18n.baseUrl` (which makes hreflang/canonical links absolute). All honour `NUXT_PUBLIC_SITE_URL`.

### Claude Code setup

`.claude/settings.json` (committed) registers the `addy-agent-skills` marketplace (GitHub `eremeev23/agent-skills`) and enables the `agent-skills@addy-agent-skills` plugin — the same setup as the easy-lessons repo. `.claude/launch.json` starts the dev server with `bun run dev`.
