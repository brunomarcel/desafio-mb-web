import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PhysicsPerson from '@/steps/PhysicsPerson.vue'

describe('PhysicsPerson.vue', () => {
  it('deve renderizar o componente PhysicsPerson no passo inicial', async () => {
    const wrapper = mount(PhysicsPerson)
    expect(wrapper.find('[data-test="physics-person"]').exists()).toBe(true)
  })

  it('deve renderizar o componente PhysicsPerson e voltar ao passo anterior', async () => {
    const wrapper = mount(PhysicsPerson)
    expect(wrapper.find('[data-test="physics-person"]').exists()).toBe(true)

    wrapper.find('[data-test="form-button__previous"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Welcome'])
  })

  it('deve mudar para a próxima etapa', async () => {
      const wrapper = mount(PhysicsPerson, {
        props: {
          modelValue: {
            physicsPerson: {
              name: 'Bruno Marcel',
              cpf: '123.456.789-00',
              dateOfBirth: '2020-01-01',
              phone: '11999999999',
            }
          }
        }
      })

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Password'])
  })

  it('não deve mudar para a próxima etapa por não estar com campos preenchidos', async () => {
      const wrapper = mount(PhysicsPerson)

      wrapper.find('[data-test="form-button__next"]').trigger('click')

      await flushPromises()
      await vi.dynamicImportSettled()

      expect(wrapper.emitted()).not.toHaveProperty('goToStep')
    })
})
