import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import InfoBlock from '~/libs/App/components/InfoBlock.vue'

describe('component test example', () => {
  it('can mount components', async () => {
    const component = await mountSuspended(InfoBlock)

    expect(component.text()).contain('Сайт в разработке')
  })
})
