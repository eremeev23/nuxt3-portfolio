import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { Btn } from '#components'

describe('btn', () => {
  it('renders a <button> without `to`', async () => {
    const wrapper = await mountSuspended(Btn, { slots: { default: () => 'Send' } })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toBe('Send')
  })

  it('renders a locale-aware link with `to`', async () => {
    const wrapper = await mountSuspended(Btn, {
      props: { to: '/projects', variant: 'line' },
      slots: { default: () => 'Projects' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/projects')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.classes()).toContain('brut')
  })
})
