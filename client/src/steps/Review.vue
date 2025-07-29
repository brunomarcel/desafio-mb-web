<script setup>
  import { ref, reactive } from 'vue'
  import InputType from '@/components/InputType.vue'
  import Header from '@/components/Header.vue'
  import PhysicsPersonForm from '@/components/PhysicsPersonForm.vue'
  import LegalPersonForm from '@/components/LegalPersonForm.vue'
  import { isPassword, isEmail } from '@/commons/validate-field'
  import { STEPS_NAME } from '@/commons/steps-name'

  const $emit = defineEmits(['update:modelValue', 'goToStep'])
  const props = defineProps(['modelValue'])
  const form = ref(null)
  const formError = ref(false)
  const hasError = reactive({
    email: false,
    password: false,
  })
  const registrationSent = ref(false)
  const resMessage = ref('')
  const { modelValue } = props
  const stepValues = reactive({
    email: modelValue?.email ?? '',
    password: modelValue?.password ?? '',
  })

  if (modelValue?.type === 'PhysicsPerson') {
    stepValues.physicsPerson = {
      name: modelValue?.physicsPerson?.name ?? '',
      cpf: modelValue?.physicsPerson?.cpf ?? '',
      dateOfBirth: modelValue?.physicsPerson?.dateOfBirth ?? '',
      phone: modelValue?.physicsPerson?.phone ?? ''
    }
  } else {
    stepValues.legalPerson = {
      registeredName: modelValue?.legalPerson?.registeredName ?? '',
      cnpj: modelValue?.legalPerson?.cnpj ?? '',
      openingDate: modelValue?.legalPerson?.openingDate ?? '',
      phone: modelValue?.legalPerson?.phone ?? ''
    }
  }

  const validateBeforeSendind = () => {
    formError.value = false

    validateEmail()
    validatePassword()

    if (modelValue.type === 'PhysicsPerson') {
      form.value?.validateName()
      form.value?.validateCpf()
      form.value?.validateDateOfBirth()
      form.value?.validatePhone()
    } else {
      form.value?.validateRegisteredName()
      form.value?.validateCnpj()
      form.value?.validateOpeningDate()
      form.value?.validatePhone()
    }
    if (formError.value) return
    send()
  }

  const send = async () => {

    const res = await fetch('http://localhost:3000/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...stepValues,
        type: modelValue?.type,
      })
    });

    const status = await res.status;
    const data = await res.json();
    if(status === 200) {
      resMessage.value = data.message
      registrationSent.value = true
      $emit('update:modelValue', {
        email: '',
        type: '',
        password: '',
        physicsPerson: {},
        legalPerson: {}
      })
    }
  }

  const newRegister = () => {
    $emit('goToStep', STEPS_NAME.WELCOME)
  }

  const handleGoToStep = ()  => {
    $emit('update:modelValue', {...modelValue, ...stepValues})
    $emit('goToStep', STEPS_NAME.PASSWORD)
  }

  const validatePassword = () => {
    hasError.password = false

    if (!isPassword(stepValues.password)) {
      hasError.password = true
      formError.value = true
    }
  }

  const validateEmail = () => {
    hasError.email = false

    if (!isEmail(stepValues.email)) {
      hasError.email = true
      formError.value = true
    }
  }

</script>

<template>
  <div v-if="!registrationSent">
    <Header
      step="4"
      text="Revise suas informações"
    />
    <main data-test="review">
      <InputType
        text="Endereço de e-mail"
        type="text"
        v-model="stepValues.email"
        errorMessage="Digite um e-mail válido"
        :hasError="hasError.email"
        :onBlur="validateEmail"
        dataTest="welcome__email"
      />

      <PhysicsPersonForm
        v-if="modelValue?.type === STEPS_NAME.PHYSICS_PERSON"
        ref="form"
        v-model="stepValues"
        v-model:formError="formError"
      />
      <LegalPersonForm
        v-if="modelValue?.type === STEPS_NAME.LEGAL_PERSON"
        ref="form"
        v-model="stepValues"
        v-model:formError="formError"
      />

      <InputType
        data-test="password__text"
        text="Senha"
        type="password"
        v-model="stepValues.password"
        errorMessage="A senha deve ter no mínimo 8 caracteres e conter numeros e/ou letras"
        :hasError="hasError.password"
        :onBlur="validatePassword"
      />
      <button
        data-test="form-button__previous"
        class="form-button form-button__outline"
        type="button"
        @click="handleGoToStep">
          Voltar
      </button>
      <button
        data-test="form-button__next"
        class="form-button form-button__primary"
        type="button"
        @click="validateBeforeSendind">
          Continuar
      </button>
    </main>
  </div>
  <div v-if="registrationSent">
    <Header
      step="4"
      :text="resMessage"
    />
    <button
      data-test="form-button__new-register"
      class="form-button form-button__primary"
      type="button"
      @click="newRegister">
      Novo Cadastro
    </button>
  </div>
</template>
