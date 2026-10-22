// A locale switch keeps the page, so it should not play the page transition.
export default defineNuxtRouteMiddleware((to, from) => {
  const base = (name: unknown) => String(name ?? '').split('___')[0] // i18n suffixes route names with ___<locale>
  if (from.name && base(to.name) === base(from.name)) {
    to.meta.pageTransition = false
  }
})
