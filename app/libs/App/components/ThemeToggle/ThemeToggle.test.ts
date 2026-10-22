import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ThemeToggle } from '#components'

/*
 * @nuxtjs/color-mode does not apply its class in the Nuxt test environment, so
 * the composable is mocked here; test/e2e/theme.spec.ts checks the real class.
 */
const colorMode = vi.hoisted(() => ({ preference: 'dark', value: 'dark' }))

mockNuxtImport('useColorMode', () => () => colorMode)

describe('themeToggle', () => {
  it('renders both states, so CSS can pick one before hydration', async () => {
    const wrapper = await mountSuspended(ThemeToggle)

    expect(wrapper.find('.theme-toggle__state--to-light').text()).toBe('Светлая')
    expect(wrapper.find('.theme-toggle__state--to-dark').text()).toBe('Тёмная')
    expect(wrapper.get('.theme-toggle').attributes('title')).toBe('Переключить тему')
  })

  it('flips the preference on click', async () => {
    const wrapper = await mountSuspended(ThemeToggle)

    await wrapper.get('.theme-toggle').trigger('click')
    expect(colorMode.preference).toBe('light')

    colorMode.value = 'light'
    await wrapper.get('.theme-toggle').trigger('click')
    expect(colorMode.preference).toBe('dark')
  })
})
