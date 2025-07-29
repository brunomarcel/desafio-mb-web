import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Password from '@/steps/Password.vue'

describe('Password.vue', () => {
  it('deve renderizar o componente Password no passo inicial', async () => {
    const wrapper = mount(Password)
    expect(wrapper.find('[data-test="password"]').exists()).toBe(true)
  })

  it('deve voltar para o passo anterior', async () => {
    const wrapper = mount(Password, {
      props: {
        modelValue: {
          type: 'LegalPerson'
        }
      }
    })
    expect(wrapper.find('[data-test="password"]').exists()).toBe(true)

    wrapper.find('[data-test="form-button__previous"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['LegalPerson'])
  })

  it('deve mudar currentStep ao emitir goToStep', async () => {
    const wrapper = mount(Password, {
      props: {
        modelValue: {
          type: 'PhysicsPerson',
        }
      }
    })

    await flushPromises()
    await vi.dynamicImportSettled()

    const text = wrapper.find('[data-test="password__text"]')
    text.setValue('12345678')
    expect(text.element.value).toBe('12345678')

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Review'])
  })

  it('não deve mudar currentStep por erro no formato da senha', async () => {
    const wrapper = mount(Password, {
      props: {
        modelValue: {
          type: 'PhysicsPerson',
        }
      }
    })

    await flushPromises()
    await vi.dynamicImportSettled()

    const text = wrapper.find('[data-test="password__text"]')
    text.setValue('1234567')
    expect(text.element.value).toBe('1234567')

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).not.toHaveProperty('goToStep')
  })
})
