import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { Navigation } from '#components'

async function active(route: string) {
  const wrapper = await mountSuspended(Navigation, { route })

  return wrapper.findAll('.nav-cell--active').map(link => ({
    text: link.text(),
    current: link.attributes('aria-current'),
  }))
}

describe('navigation', () => {
  it('lists the four sections, localized', async () => {
    const wrapper = await mountSuspended(Navigation, { route: '/' })

    expect(wrapper.findAll('a').map(link => link.attributes('href'))).toEqual(['/', '/projects', '/blog', '/contacts'])
    expect(wrapper.findAll('a').map(link => link.text())).toEqual(['Главная', 'Проекты', 'Блог', 'Контакты'])
  })

  it.each([
    ['/', 'Главная'],
    ['/projects', 'Проекты'],
    ['/blog', 'Блог'],
    ['/contacts', 'Контакты'],
  ])('marks the active section on %s, and only it', async (route, name) => {
    expect(await active(route)).toEqual([{ text: name, current: 'page' }])
  })

  it('keeps PROJECTS active on a project page', async () => {
    expect(await active('/projects/some-project')).toEqual([{ text: 'Проекты', current: 'page' }])
  })
})
