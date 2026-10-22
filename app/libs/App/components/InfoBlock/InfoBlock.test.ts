import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { InfoBlock } from '#components'

describe('infoBlock', () => {
  it('renders the placeholder heading', async () => {
    const component = await mountSuspended(InfoBlock)

    expect(component.text()).contain('Сайт в разработке')
  })
})
