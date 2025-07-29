import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('deve renderizar o componente Welcome no passo inicial', async () => {
    const wrapper = mount(App)
    await flushPromises()
    await vi.dynamicImportSettled();

    expect(wrapper.find('[data-test="app"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="welcome"]').exists()).toBe(true)

  })

  it('deve mudar currentStep ao emitir goToStep', async () => {
    const wrapper = mount(App)

    await flushPromises()
    await vi.dynamicImportSettled()

    const email = wrapper.find('[data-test="welcome__email"]')
    email.setValue('bruno@gmail.com')
    expect(email.element.value).toBe('bruno@gmail.com')

    const radio = wrapper.find('[data-test="welcome__physics-person"]')
    radio.setValue('PhysicsPerson')
    expect(radio.element.checked).toBe(true)

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.find('[data-test="header__text"]').text()).toBe('Pessoa Física')
  })
})

it('deve restaurar formData e currentStep do localStorage no mounted', async () => {
  const localStorageMock = (() => {
    let store = {}
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value
      })
    }
  })()
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })

  const mockFormData = {
    email: 'bruno@gmail.com',
    type: 'LegalPerson'
  }
  const mockStepName = 'Welcome'

  localStorage.setItem('formData', JSON.stringify(mockFormData))
  localStorage.setItem('stepName', mockStepName)

  const wrapper = mount(App)

  await wrapper.vm.$nextTick()

  expect(wrapper.vm.formData).toMatchObject(mockFormData)
  expect(wrapper.vm.currentStep).toBe(mockStepName)
})

