import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('Should render Header component', () => {
    const wrapper = mount(Header, {
      props: {
        step: 1,
        text: 'Seja bem vindo(a)'
      }
    })
    const step = wrapper.find('.header__step')
    expect(step.text()).toBe('1')

    const text = wrapper.find('[data-test="header__text"]')
    expect(text.text()).toContain('Seja bem vindo(a)')
    const stepText = wrapper.find('[data-test="header__step-Text"]')
    expect(stepText.text()).toContain('Etapa 1 de 4')
  })
})
