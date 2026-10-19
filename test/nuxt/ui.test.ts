import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppLogo from '~/libs/App/components/AppLogo.vue'
import BrutButton from '~/libs/App/components/BrutButton.vue'
import Chip from '~/libs/App/components/Chip.vue'
import PageTitle from '~/libs/App/components/PageTitle.vue'
import TheMarquee from '~/libs/App/components/TheMarquee.vue'

describe('brutButton', () => {
  it('renders a <button> without `to`', async () => {
    const wrapper = await mountSuspended(BrutButton, { slots: { default: () => 'Send' } })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toBe('Send')
  })

  it('renders a locale-aware link with `to`', async () => {
    const wrapper = await mountSuspended(BrutButton, {
      props: { to: '/projects', variant: 'line' },
      slots: { default: () => 'Projects' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/projects')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.classes()).toContain('brut')
  })
})

describe('chip', () => {
  it('uses accent colours when active', async () => {
    const wrapper = await mountSuspended(Chip, { props: { variant: 'active' } })

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['border-accent', 'text-accent']))
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

describe('pageTitle', () => {
  it('renders the title with a decorative accent dot', async () => {
    const wrapper = await mountSuspended(PageTitle, { slots: { default: () => 'Projects' } })
    const dot = wrapper.get('[data-testid="page-title-dot"]')

    expect(wrapper.element.tagName).toBe('H1')
    expect(dot.text()).toBe('.')
    expect(dot.classes()).toContain('text-accent')
    expect(dot.attributes('aria-hidden')).toBe('true')
  })
})

describe('theMarquee', () => {
  it('hides the duplicated copy from assistive tech', async () => {
    const wrapper = await mountSuspended(TheMarquee, { props: { items: ['Vue', 'Nuxt'] } })
    const lists = wrapper.findAll('ul')

    expect(lists).toHaveLength(2)
    expect(lists[0]!.attributes('aria-hidden')).toBeUndefined()
    expect(lists[1]!.attributes('aria-hidden')).toBe('true')
  })
})

describe('appLogo', () => {
  it('has an accessible name', async () => {
    const wrapper = await mountSuspended(AppLogo)

    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Eremeev dev')
  })
})
