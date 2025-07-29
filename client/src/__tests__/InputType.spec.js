import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputType from '@/components/InputType.vue'

describe('InputType.vue', () => {
  it('Should render InputType component', () => {
    const wrapper = mount(InputType, {
      props: {
        modelValue: {
          email: ''
        },
        text: "Endereço de e-mail",
        type: 'email',
        errorMessage: "Digite um e-mail válido",
        hasError: false,
        onBlur: () => true,
        dataTest: "inputType"
      }
    })
    expect(wrapper.find('[data-test="inputType"]').exists()).toBe(true)
  })
})
