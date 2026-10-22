import { expect, test } from '@nuxt/test-utils/playwright'

test('the theme toggle switches the class on <html> and survives a reload', async ({ page, goto }) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error' || message.text().includes('Hydration')) {
      errors.push(message.text())
    }
  })

  await goto('/en', { waitUntil: 'hydration' })
  await expect(page.locator('html')).toHaveClass(/dark/)

  await page.locator('header .theme-toggle').click()
  await expect(page.locator('html')).toHaveClass(/light/)

  // The class is set before paint and the right state is shown with no hydration warning.
  await page.reload({ waitUntil: 'networkidle' })
  await expect(page.locator('html')).toHaveClass(/light/)
  await expect(page.locator('header .theme-toggle__state--to-dark')).toBeVisible()
  await expect(page.locator('header .theme-toggle__state--to-light')).toBeHidden()
  expect(errors.filter(text => text.includes('Hydration'))).toEqual([])
})
