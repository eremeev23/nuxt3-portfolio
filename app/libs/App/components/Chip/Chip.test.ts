import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { Chip } from '#components'

describe('chip', () => {
  it('uses accent colours when active', async () => {
    const wrapper = await mountSuspended(Chip, { props: { variant: 'active' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['border-accent', 'text-accentText']))
  })

  it('is not accented by default', async () => {
    const wrapper = await mountSuspended(Chip)

    expect(wrapper.classes()).not.toContain('text-accent')
  })

  it('exposes the active state as aria-pressed when it is a button', async () => {
    const wrapper = await mountSuspended(Chip, { props: { as: 'button', variant: 'active' } })

    expect(wrapper.attributes('aria-pressed')).toBe('true')
    expect(wrapper.classes()).toContain('min-h-11')
  })
})
