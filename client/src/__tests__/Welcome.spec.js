import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Welcome from '@/steps/Welcome.vue'

describe('Welcome.vue', () => {
  it('deve renderizar o componente Welcome no passo inicial', async () => {
    const wrapper = mount(Welcome)
    expect(wrapper.find('[data-test="welcome"]').exists()).toBe(true)
  })

  it('deve mudar currentStep ao emitir goToStep', async () => {
    const wrapper = mount(Welcome, {
      props: {
        modelValue: {
          email: 'bruno@gmail.com',
          type: 'PhysicsPerson'
        }
      }
    })

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['PhysicsPerson'])
    expect(wrapper.find('[data-test="welcome"]').exists()).toBe(true)
  })

  it('não deve mudar currentStep por erro no campo input', async () => {
    const wrapper = mount(Welcome, {
      props: {
        modelValue: {
          email: 'bruno@gmail.com',
          type: ''
        }
      }
    })

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).not.toHaveProperty('goToStep')
  })

  it('não deve mudar currentStep por erro no campo email', async () => {
    const wrapper = mount(Welcome, {
      props: {
        modelValue: {
          email: '',
          type: 'LegalPerson'
        }
      }
    })

    const email = wrapper.find('[data-test="welcome__email"]')
    email.setValue('brunogmail.com')
    expect(email.element.value).toBe('brunogmail.com')

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).not.toHaveProperty('goToStep')
  })

  it('não deve mudar currentStep por não escollher Pessoa Física ou Pessoa Jurídica', async () => {
    const wrapper = mount(Welcome, {
      props: {
        modelValue: {
          email: 'bruno@gmail.com',
          type: ''
        }
      }
    })

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).not.toHaveProperty('goToStep')
  })
})
