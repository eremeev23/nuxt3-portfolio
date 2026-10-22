// Functions
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'

// Components
import Header from '~/libs/App/components/Header/Header.vue'

registerEndpoint('/api/contacts', () => [
  { title: 'E-mail', hrefPref: 'mailto:', value: 'me@example.com', href: 'me@example.com' },
  { title: 'GitHub', hrefPref: '', value: '@me', href: 'https://github.com/me' },
])

// Unmounted before the body is wiped, or the lazy /api/contacts response re-renders into a detached node.
const mounted: { unmount: () => void }[] = []

async function mountHeader(route?: string) {
  const wrapper = await mountSuspended(Header, { attachTo: document.body, route })
  mounted.push(wrapper)

  return wrapper
}

function dialog() {
  return document.body.querySelector('[role="dialog"]')
}

describe('header mobile menu', () => {
  afterEach(() => {
    mounted.splice(0).forEach(wrapper => wrapper.unmount())
    document.body.innerHTML = ''
  })

  it('the burger opens the menu and, turned into an ✕, closes it', async () => {
    const wrapper = await mountHeader()
    const burger = wrapper.get('.header__burger')

    expect(burger.attributes('aria-expanded')).toBe('false')
    expect(burger.attributes('aria-label')).toBe('Открыть меню')
    expect(burger.text()).toBe('')
    expect(dialog()).toBeNull()

    await burger.trigger('click')

    expect(burger.attributes('aria-expanded')).toBe('true')
    expect(burger.attributes('aria-label')).toBe('Закрыть меню')
    expect(burger.classes()).toContain('burger-button--open')
    expect(dialog()?.getAttribute('aria-modal')).toBe('true')
    expect(dialog()?.id).toBe(burger.attributes('aria-controls'))
    expect(document.documentElement.style.overflow).toBe('hidden')

    await burger.trigger('click')

    expect(burger.attributes('aria-expanded')).toBe('false')
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('closes on Escape', async () => {
    const wrapper = await mountHeader()
    const burger = wrapper.get('.header__burger')

    await burger.trigger('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(burger.attributes('aria-expanded')).toBe('false')
  })

  it('lists the four sections, numbered', async () => {
    const wrapper = await mountHeader()

    await wrapper.get('.header__burger').trigger('click')

    const numbers = [...dialog()!.querySelectorAll('.menu__num')].map(item => item.textContent)
    expect(numbers).toEqual(['01', '02', '03', '04'])
  })

  it('fills the row of the current section, a project page included', async () => {
    const wrapper = await mountHeader('/projects/some-project')

    await wrapper.get('.header__burger').trigger('click')

    const active = [...dialog()!.querySelectorAll('.menu__link--active')]
    expect(active.map(link => link.querySelector('.menu__name')?.textContent)).toEqual(['Проекты'])
    expect(active[0]?.getAttribute('aria-current')).toBe('page')
  })

  it('the theme button keeps its label for screen readers', async () => {
    const wrapper = await mountHeader()
    const theme = wrapper.get('.theme-toggle')

    expect(theme.findAll('.theme-toggle__label').map(label => label.text())).toEqual(['Светлая', 'Тёмная'])
    expect(theme.attributes('title')).toBe('Переключить тему')
  })

  it('the language selector shows the current flag and lists flag and native name', async () => {
    const wrapper = await mountHeader()
    const trigger = wrapper.get('.locale-selector .selector__trigger')

    expect(trigger.find('svg.pixel-flag').exists()).toBe(true)
    expect(trigger.get('.sr-only').text()).toBe('Язык: Русский')

    await trigger.trigger('click')

    const options = wrapper.findAll('.locale-selector .selector__option')
    expect(options.map(option => option.get('span').text())).toEqual(
      ['Русский', 'English', 'Čeština', 'Srpski', 'Español', 'Deutsch', 'Português', 'Italiano', 'Français'],
    )
    expect(options.every(option => option.find('svg.pixel-flag').exists())).toBe(true)
  })
})
