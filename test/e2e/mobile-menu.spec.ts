import { expect, test } from '@nuxt/test-utils/playwright'

test('the page never scrolls sideways', async ({ page, goto }) => {
  await goto('/en', { waitUntil: 'hydration' })

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('the burger menu opens, navigates and closes', async ({ page, goto }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'the burger only shows at ≤980px')

  await goto('/en', { waitUntil: 'hydration' })

  const burger = page.getByRole('button', { name: 'Open menu' })
  await burger.click()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  // The same button, now the close control.
  const close = page.getByRole('button', { name: 'Close menu' })
  await expect(close).toHaveAttribute('aria-expanded', 'true')

  await close.click()
  await expect(dialog).toBeHidden()

  await burger.click()
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(burger).toBeFocused()

  await burger.click()
  await dialog.getByRole('link', { name: /projects/i }).click()
  await expect(page).toHaveURL(/\/en\/projects$/)
  await expect(dialog).toBeHidden()
})

test('the open menu traps Tab and Shift+Tab and fits the phone', async ({ page, goto }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'the burger only shows at ≤980px')

  await goto('/en', { waitUntil: 'hydration' })

  const burger = page.getByRole('button', { name: 'Open menu' })
  await burger.click()

  const dialog = page.getByRole('dialog', { name: 'Site menu' })
  await expect(dialog).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-controls',
    await dialog.getAttribute('id') ?? '',
  )

  // Every stop is the burger or inside the dialog, and the cycle wraps back to the burger.
  const stops = await dialog.evaluate(element => [...element.querySelectorAll<HTMLElement>('a[href], button')]
    .filter(item => item.offsetParent !== null)
    .length)
  const isInCycle = () => page.evaluate(() => {
    const active = document.activeElement
    return !!active && (active.closest('[role="dialog"]') !== null || active.classList.contains('burger-button'))
  })

  for (let i = 0; i < stops; i++) {
    await page.keyboard.press('Tab')
    expect(await isInCycle()).toBe(true)
    // Not still the burger: Tab moves into the dialog rather than to the page behind it.
    await expect(page.getByRole('button', { name: 'Close menu' })).not.toBeFocused()
  }

  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused()

  await page.keyboard.press('Shift+Tab')
  expect(await page.evaluate(() => document.activeElement?.closest('[role="dialog"]') !== null)).toBe(true)

  // Page scroll is locked and nothing pokes out sideways.
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(burger).toBeFocused()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
})
