import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { BurgerButton } from '#components'

describe('burgerButton', () => {
  it('toggles its v-model and switches label, state and look', async () => {
    const wrapper = await mountSuspended(BurgerButton, {
      props: {
        'modelValue': false,
        'controls': 'menu',
        'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value }),
      },
    })

    expect(wrapper.attributes('aria-expanded')).toBe('false')
    expect(wrapper.attributes('aria-controls')).toBe('menu')
    expect(wrapper.attributes('aria-label')).toBe('Открыть меню')
    expect(wrapper.text()).toBe('')

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.attributes('aria-expanded')).toBe('true')
    expect(wrapper.attributes('aria-label')).toBe('Закрыть меню')
    expect(wrapper.classes()).toContain('burger-button--open')
  })

  it('exposes its button element', async () => {
    const wrapper = await mountSuspended(BurgerButton)

    expect((wrapper.vm as unknown as { el: HTMLElement }).el.tagName).toBe('BUTTON')
  })
})
