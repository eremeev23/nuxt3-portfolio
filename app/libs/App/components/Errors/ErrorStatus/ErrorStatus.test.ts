import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ErrorStatus } from '#components'

const { clearError } = vi.hoisted(() => ({ clearError: vi.fn() }))

mockNuxtImport('clearError', () => clearError)

async function actions(status?: number) {
  const wrapper = await mountSuspended(ErrorStatus, { props: { status } })

  return {
    wrapper,
    buttons: wrapper.findAll('.error-view > div:last-child > *').map(item => ({
      tag: item.element.tagName,
      text: item.text(),
      href: item.attributes('href'),
    })),
  }
}

describe('errorStatus', () => {
  it.each([
    [403, [{ tag: 'A', text: '← Главная', href: '/' }]],
    [404, [
      { tag: 'A', text: '← На главную', href: '/' },
      { tag: 'A', text: 'Все проекты', href: '/projects' },
    ]],
    [500, [
      { tag: 'BUTTON', text: 'Попробовать снова ↻', href: undefined },
      { tag: 'A', text: '← Главная', href: '/' },
    ]],
    [503, [
      { tag: 'BUTTON', text: 'Попробовать снова ↻', href: undefined },
      { tag: 'A', text: '← Главная', href: '/' },
    ]],
  ])('%s offers its own actions', async (status, expected) => {
    const { wrapper, buttons } = await actions(status)

    expect(wrapper.get('.glitch-text').text()).toBe(String(status))
    expect(buttons).toEqual(expected)
  })

  it.each([undefined, 401, 502])('shows the server error for %s', async status => {
    const { wrapper } = await actions(status)

    expect(wrapper.get('.glitch-text').text()).toBe('500')
    expect(wrapper.get('h2').text()).toBe('ОШИБКА · ВНУТРЕННЯЯ ОШИБКА СЕРВЕРА')
  })

  it('try again clears the error and reloads the same route', async () => {
    const wrapper = await mountSuspended(ErrorStatus, { props: { status: 503 }, route: '/projects?page=2' })

    await wrapper.get('button').trigger('click')

    expect(clearError).toHaveBeenCalledWith({ redirect: '/projects?page=2' })
  })
})
