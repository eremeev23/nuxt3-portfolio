import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { PageTitle } from '#components'

describe('pageTitle', () => {
  it('renders the title with a decorative accent dot', async () => {
    const wrapper = await mountSuspended(PageTitle, { props: { text: 'Projects' } })
    const dot = wrapper.get('[data-testid="page-title-dot"]')

    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.get('.sr-only').text()).toBe('Projects')
    expect(dot.text()).toBe('.')
    expect(dot.classes()).toContain('text-accent')
    expect(dot.attributes('aria-hidden')).toBe('true')
  })

  it('renders the letters without waiting for the client, and only phrasing content inside the heading', async () => {
    const wrapper = await mountSuspended(PageTitle, { props: { text: 'Hi there', tag: 'h2' } })

    expect(wrapper.element.tagName).toBe('H2')
    expect(wrapper.findAll('.scramble-text__real').map(cell => cell.text()).join('')).toBe('Hithere')
    expect(wrapper.find('div').exists()).toBe(false)
  })
})
