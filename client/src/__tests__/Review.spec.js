import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Review from '@/steps/Review.vue'

describe('Review.vue', () => {
  it('deve renderizar o componente Review no passo inicial', async () => {
    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'PhysicsPerson'
        }
      }
    })
    expect(wrapper.find('[data-test="review"]').exists()).toBe(true)
  })

  it('deve renderizar o componente Review e voltar ao passo anterior', async () => {
    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'LegalPerson'
        }
      }
    })
    expect(wrapper.find('[data-test="review"]').exists()).toBe(true)

    wrapper.find('[data-test="form-button__previous"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Password'])
  })

  it('deve estar com todos os campos de PhysicsPerson preenchidos', () => {
    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'PhysicsPerson',
          email: 'bruno@gmail.com',
          password: '12345678',
          physicsPerson: {
            name: 'Bruno Marcel',
            cpf: '123.456.789-00',
            dateOfBirth: '2020-01-01',
            phone: '11999999999',
          }
        }
      }
    })

    const email = wrapper.find('[data-test="welcome__email"]')
    expect(email.element.value).toBe('bruno@gmail.com')

    const name = wrapper.find('[data-test="physics-person__name"]')
    expect(name.element.value).toBe('Bruno Marcel')

    const cpf = wrapper.find('[data-test="physics-person__cpf"]')
    expect(cpf.element.value).toBe('123.456.789-00')

    const date = wrapper.find('[data-test="physics-person__date"]')
    expect(date.element.value).toBe('2020-01-01')

    const phone = wrapper.find('[data-test="physics-person__phone"]')
    expect(phone.element.value).toBe('11999999999')

    const text = wrapper.find('[data-test="password__text"]')
    expect(text.element.value).toBe('12345678')
  })

  it('deve estar com todos os campos de LegalPerson preenchidos', () => {
    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'LegalPerson',
          email: 'bruno@gmail.com',
          password: '12345678',
          legalPerson: {
            registeredName: 'Bruno Marcel',
            cnpj: '99.999.999/0001-99',
            openingDate: '2020-01-01',
            phone: '11999999999',
          }
        }
      }
    })

    const email = wrapper.find('[data-test="welcome__email"]')
    expect(email.element.value).toBe('bruno@gmail.com')

    const registeredName = wrapper.find('[data-test="legal-person__registered-name"]')
    expect(registeredName.element.value).toBe('Bruno Marcel')

    const cnpj = wrapper.find('[data-test="legal-person__cnpj"]')
    expect(cnpj.element.value).toBe('99.999.999/0001-99')

    const date = wrapper.find('[data-test="legal-person__opening-date"]')
    expect(date.element.value).toBe('2020-01-01')

    const phone = wrapper.find('[data-test="legal-person__phone"]')
    expect(phone.element.value).toBe('11999999999')

    const text = wrapper.find('[data-test="password__text"]')
    expect(text.element.value).toBe('12345678')
  })

  it('valida os campos com erro', async () => {

    const wrapper = mount(Review, {
      props: {
        modelValue: { type: 'PhysicsPerson' }
      }
    })

    expect(wrapper.vm.hasError).toEqual({ email: false, password: false })

    const emailError = wrapper.find('[data-test="welcome__email"]')
    emailError.setValue('brunogmail.com')
    emailError.trigger('blur')
    expect(wrapper.vm.hasError).toEqual({ email: true, password: false })

    const email = wrapper.find('[data-test="welcome__email"]')
    email.setValue('brun@gmail.com')
    email.trigger('blur')
    expect(wrapper.vm.hasError).toEqual({ email: false, password: false })

    const passwordError = wrapper.find('[data-test="password__text"]')
    passwordError.setValue('1234567')
    passwordError.trigger('blur')
    expect(wrapper.vm.hasError).toEqual({ email: false, password: true })

    const password = wrapper.find('[data-test="password__text"]')
    password.setValue('12345678')
    password.trigger('blur')
    expect(wrapper.vm.hasError).toEqual({ email: false, password: false })

  })

  it('deve chamar o fetch e emitir update:modelValue ao sucesso para Pessoa Física', async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Cadastro de Pessoa Física recebido com sucesso!' }),
      })
    )

    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'PhysicsPerson',
          email: 'bruno@gmail.com',
          password: '12345678',
          physicsPerson: {
            name: 'Bruno Marcel',
            cpf: '123.456.789-00',
            dateOfBirth: '2020-01-01',
            phone: '11999999999',
          }
        }
      }
    })

    await wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registration', expect.anything())

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual({
      email: '',
      type: '',
      password: '',
      physicsPerson: {},
      legalPerson: {},
    })

    const feedbackMessage = wrapper.find('[data-test="header__text"]')
    expect(feedbackMessage.text()).toBe('Cadastro de Pessoa Física recebido com sucesso!')

    await wrapper.find('[data-test="form-button__new-register"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Welcome'])
  })

  it('deve chamar o fetch e emitir update:modelValue ao sucesso para Pessoa Jurídica', async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Cadastro de Pessoa Jurídica recebido com sucesso!' }),
      })
    )

    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'LegalPerson',
          email: 'bruno@gmail.com',
          password: '12345678',
          legalPerson: {
            registeredName: 'Bruno Marcel',
            cnpj: '99.999.999/0001-99',
            openingDate: '2020-01-01',
            phone: '11999999999',
          }
        }
      }
    })

    await wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/registration', expect.anything())

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual({
      email: '',
      type: '',
      password: '',
      physicsPerson: {},
      legalPerson: {},
    })

    const feedbackMessage = wrapper.find('[data-test="header__text"]')
    expect(feedbackMessage.text()).toBe('Cadastro de Pessoa Jurídica recebido com sucesso!')

    await wrapper.find('[data-test="form-button__new-register"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(wrapper.emitted()).toHaveProperty('goToStep')
    expect(wrapper.emitted('goToStep')[0]).toEqual(['Welcome'])
  })

  it('não deve chamar o fetch e emitir update:modelValue por erro no campo email', async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Cadastro de Pessoa Jurídica recebido com sucesso!' }),
      })
    )

    const wrapper = mount(Review, {
      props: {
        modelValue: {
          type: 'LegalPerson',
          email: 'brunogmail.com',
          password: '12345678',
          legalPerson: {
            registeredName: 'Bruno Marcel',
            cnpj: '99.999.999/0001-99',
            openingDate: '2020-01-01',
            phone: '11999999999',
          }
        }
      }
    })

    await wrapper.find('[data-test="form-button__next"]').trigger('click')

    await flushPromises()
    await vi.dynamicImportSettled()

    expect(fetch).not.toBeCalled()

    const feedbackMessage = wrapper.find('[data-test="header__text"]')
    expect(feedbackMessage.text()).toBe('Revise suas informações')
  })
})
