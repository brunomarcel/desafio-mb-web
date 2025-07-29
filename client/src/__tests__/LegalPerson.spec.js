import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import LegalPerson from '@/steps/LegalPerson.vue'

describe('LegalPerson.vue', () => {
  it('deve renderizar o componente LegalPerson no passo inicial', async () => {
    const wrapper = mount(LegalPerson)
    expect(wrapper.find('[data-test="legal-person"]').exists()).toBe(true)
  })

  it('deve renderizar o componente LegalPerson e voltar ao passo anterior', async () => {
    const wrapper = mount(LegalPerson)
    expect(wrapper.find('[data-test="legal-person"]').exists()).toBe(true)

    wrapper.find('[data-test="form-button__previous"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Welcome'])
  })

  it('deve mudar para a próxima etapa', async () => {
    const wrapper = mount(LegalPerson, {
      props: {
        modelValue: {
          legalPerson: {
            registeredName: 'Bruno Marcel',
            cnpj: '99.999.999/0001-99',
            openingDate: '2020-01-01',
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
    const wrapper = mount(LegalPerson)

    wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).not.toHaveProperty('goToStep')
  })
})
