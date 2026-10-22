import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { TheMarquee } from '#components'

describe('theMarquee', () => {
  it('hides the duplicated copy from assistive tech', async () => {
    const wrapper = await mountSuspended(TheMarquee, { props: { items: ['Vue', 'Nuxt'] } })
    const lists = wrapper.findAll('ul')

    expect(lists).toHaveLength(2)
    expect(lists[0]!.attributes('aria-hidden')).toBeUndefined()
    expect(lists[1]!.attributes('aria-hidden')).toBe('true')
  })
})
