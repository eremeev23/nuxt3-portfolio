import { expect, test } from '@nuxt/test-utils/playwright'

const routes = [
  { path: '/en', title: 'Frontend developer | Maksim Eremeev', section: 'Home' },
  { path: '/en/projects', title: 'Projects | Maksim Eremeev', section: 'Projects' },
  { path: '/en/projects/some-project', title: 'some-project | Maksim Eremeev', section: 'Projects' },
  { path: '/en/blog', title: 'Blog | Maksim Eremeev', section: 'Blog' },
  { path: '/en/contacts', title: 'Contacts | Maksim Eremeev', section: 'Contacts' },
]

for (const route of routes) {
  test(`${route.path} renders inside the layout`, async ({ page, goto }, testInfo) => {
    await goto(route.path, { waitUntil: 'hydration' })

    await expect(page).toHaveTitle(route.title)
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // The section links are in the bar on desktop and in the burger menu below 980px.
    if (testInfo.project.name === 'desktop') {
      await expect(page.locator('header .nav-cell--active[aria-current="page"]')).toHaveText(route.section)
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}

test('an unknown route shows the styled 404 inside the layout', async ({ page, goto }) => {
  const response = await page.goto('/en/blogs')
  expect(response?.status()).toBe(404)
  await goto('/en/blogs', { waitUntil: 'hydration' })

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('.glitch-text')).toHaveText('404')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)

  await page.getByRole('link', { name: '← Back home' }).click()
  await expect(page).toHaveURL(/\/en$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Frontend developer' })).toBeVisible()
})
