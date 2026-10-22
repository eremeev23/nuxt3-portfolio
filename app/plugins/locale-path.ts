/*
 * `$p(route, locale?)` — localized path, available as `$p` in every template
 * and as `useNuxtApp().$p` in scripts.
 *
 * It is a plugin rather than a util on purpose: it resolves @nuxtjs/i18n's `localePath`
 * once, bound to the Nuxt app, so it calls no composables and
 * works anywhere — inside `computed`, watchers, handlers, after an `await`.
 * A util that called `useLocalePath()` / `useI18n()` on every call only
 * worked synchronously inside `setup`, and threw "Must be called at the top
 * of a `setup` function" as soon as a `computed` re-ran on a locale change.
 */
export default defineNuxtPlugin({
  name: 'locale-path',
  dependsOn: ['i18n:plugin'],
  setup() {
    // Called once here, in the plugin's Nuxt context; the returned function is bound to the app.
    const localePath = useLocalePath()

    return {
      provide: {
        p: localePath,
      },
    }
  },
})
