/*
 * The four site sections, shared by the header, the mobile menu and the error page.
 * `active` is computed from the route rather than left to `router-link-active`:
 * /projects/[id] is a sibling of /projects in the route tree, not its child, so
 * the router would not mark PROJECTS on a project page.
 */
export function useNavPages() {
  const { t } = useI18n()
  const route = useRoute()
  const { $p } = useNuxtApp()

  function isActive(path: string) {
    const target = $p(path)

    return path === '/'
      ? route.path === target
      : route.path === target || route.path.startsWith(`${target}/`)
  }

  return computed(() => [
    { name: t('home.title'), path: '/' },
    { name: t('projects.title'), path: '/projects' },
    { name: t('blog.title'), path: '/blog' },
    { name: t('contacts.title'), path: '/contacts' },
  ].map(page => ({ ...page, active: isActive(page.path) })))
}
