import { expect, test } from '@nuxt/test-utils/playwright'

test('home page renders in both locales', async ({ page, goto }) => {
  await goto('/en', { waitUntil: 'hydration' })
  await expect(page).toHaveTitle('Frontend developer | Maksim Eremeev')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
  await expect(page.getByRole('heading', { level: 1, name: 'Frontend developer' })).toBeVisible()

  /*
   * A cookie pins the locale, so browser-language detection on `/` does not
   * redirect to /en.
   */
  await page
    .context()
    .addCookies([{ name: 'i18n_locale', value: 'ru', url: page.url() }])
  await goto('/', { waitUntil: 'hydration' })
  await expect(page).toHaveTitle('Фронтенд-разработчик | Максим Еремеев')
  await expect(page.getByRole('heading', { level: 1, name: 'Фронтенд-разработчик' })).toBeVisible()
})
