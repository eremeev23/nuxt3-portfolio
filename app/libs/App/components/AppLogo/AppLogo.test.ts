import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { AppLogo } from '#components'

describe('appLogo', () => {
  it('has an accessible name', async () => {
    const wrapper = await mountSuspended(AppLogo)

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Eremeev dev')
  })
})
