// Functions
import { flushPromises } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

// Components
import ErrorView from '~/libs/App/components/Errors/ErrorView/ErrorView.vue'

// Types
import type { CustomError } from '~/libs/App/components/Errors/types/custom-error.type.ts'

function error(status: number, url = '/nowhere'): CustomError {
  return {
    error: true,
    name: 'Error',
    message: `Error ${status}`,
    status,
    statusText: `Status ${status}`,
    unhandled: true,
    fatal: true,
    url,
    method: 'GET',
  }
}

async function mountError(value: CustomError) {
  const wrapper = await mountSuspended(ErrorView, { props: { error: value } })
  await flushPromises()

  return wrapper
}

describe('error view', () => {
  it.each([
    [403, 'Доступ запрещён'],
    [404, 'Страница не найдена'],
    [500, 'Внутренняя ошибка сервера'],
    [503, 'Сервис недоступен'],
  ])('renders the %s view', async (status, title) => {
    const wrapper = await mountError(error(status))

    expect(wrapper.get('h2').text()).toBe(`ОШИБКА · ${title.toUpperCase()}`)
    expect(wrapper.get('.glitch-text').text()).toBe(String(status))
  })

  it('falls back to the server error view for a status with no view of its own', async () => {
    const wrapper = await mountError(error(401))

    expect(wrapper.get('h2').text()).toContain('ВНУТРЕННЯЯ ОШИБКА СЕРВЕРА')
    // The request panel still reports the real status, with the server's own text.
    expect(wrapper.get('.error-info').text()).toContain('401 · Status 401')
  })

  it('on a 404, suggests the section the URL probably meant', async () => {
    const wrapper = await mountError(error(404, '/en/blogs'))
    const suggestion = wrapper.get('.error-info a')

    expect(suggestion.text()).toBe('/blog')
    expect(suggestion.attributes('href')).toBe('/blog')
  })

  it('links to every section and counts them', async () => {
    const wrapper = await mountError(error(404))
    const nav = wrapper.findAll('.error-nav-cell')

    expect(nav.map(link => link.attributes('href'))).toEqual(['/', '/projects', '/blog', '/contacts'])
    expect(wrapper.text()).toContain('4 МАРШРУТА')
  })

  it('the 404 home button is a link home', async () => {
    const wrapper = await mountError(error(404))

    expect(wrapper.findAll('a').some(link => link.text() === '← На главную' && link.attributes('href') === '/')).toBe(true)
  })
})
