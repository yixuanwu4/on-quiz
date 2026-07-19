import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShoeCard from '../ShoeCard.vue'

describe('ShoeCard', () => {
  it('renders properly', () => {
    const wrapper = mount(ShoeCard, { slots: { header: 'Header', content: 'Content' } })
    expect(wrapper.text()).toContain('Header')
    expect(wrapper.text()).toContain('Content')
  })
})
