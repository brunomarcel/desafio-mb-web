<script setup>
  import { reactive } from 'vue';
  import InputType from './InputType.vue';
  import { isCnpj, isDate, isRegisteredName, isPhone } from '@/commons/validate-field'

  const props = defineProps([
    'modelValue',
    'formError'
  ])
  const $emit = defineEmits(['update:formError'])
  const hasError = reactive({
    registeredName: false,
    cnpj: false,
    openingDate: false,
    phone: false
  })
  const { modelValue } = props

  const validateRegisteredName = () => {
    hasError.registeredName = false

    if (!isRegisteredName(modelValue.legalPerson.registeredName)) {
      hasError.registeredName = true
      $emit('update:formError', true)
    }
  }

  const validateCnpj = () => {
    hasError.cnpj = false

    if (!isCnpj(modelValue.legalPerson.cnpj)) {
      hasError.cnpj = true
      $emit('update:formError', true)
    }
  }

  const validateOpeningDate = () => {
    hasError.openingDate = false

    if (!isDate(modelValue.legalPerson.openingDate)) {
      hasError.openingDate = true
      $emit('update:formError', true)
    }
  }

  const validatePhone = () => {
    hasError.phone = false

    if (!isPhone(modelValue.legalPerson.phone)) {
      hasError.phone = true
      $emit('update:formError', true)
    }
  }

  defineExpose({
    validateRegisteredName,
    validateCnpj,
    validateOpeningDate,
    validatePhone
  })
</script>

<template>
  <InputType
      text="Razão social"
      type="text"
      v-model="modelValue.legalPerson.registeredName"
      errorMessage="Digite um nome válido"
      :hasError="hasError.registeredName"
      :onBlur="validateRegisteredName"
      dataTest="legal-person__registered-name"
    />
    <InputType
      text="CNPJ"
      type="text"
      v-model="modelValue.legalPerson.cnpj"
      errorMessage="O cpf deve ter 14 caracteres"
      :hasError="hasError.cnpj"
      :onBlur="validateCnpj"
      dataTest="legal-person__cnpj"
    />
    <InputType
      text="Data de abertura"
      type="date"
      v-model="modelValue.legalPerson.openingDate"
      errorMessage="Preencha uma data válida"
      :hasError="hasError.openingDate"
      :onBlur="validateOpeningDate"
      dataTest="legal-person__opening-date"
    />
    <InputType
      text="Telefone"
      type="text"
      v-model="modelValue.legalPerson.phone"
      errorMessage="o telefone deve apenas números e ter 11 dígitos com DDD"
      :hasError="hasError.phone"
      :onBlur="validatePhone"
      dataTest="legal-person__phone"
    />
</template>
