<script setup>
  import { reactive } from 'vue';
  import InputType from './InputType.vue';
  import { isCpf, isFullName, isDate, isPhone } from '@/commons/validate-field'

  const props = defineProps([
    'modelValue',
    'formError'
  ])
  const $emit = defineEmits(['update:formError'])
  const hasError = reactive({
    name: false,
    cpf: false,
    dateOfBirth: false,
    phone: false
  })
  const { modelValue } = props

  const validateName = () => {
    hasError.name = false
    if (!isFullName(modelValue.physicsPerson.name)) {
      hasError.name = true
      $emit('update:formError', true)
    }
  }

  const validateCpf = () => {
    hasError.cpf = false
    if (!isCpf(modelValue.physicsPerson.cpf)) {
      hasError.cpf = true
      $emit('update:formError', true)
    }
  }

  const validateDateOfBirth = () => {
    hasError.dateOfBirth = false
    if (!isDate(modelValue.physicsPerson.dateOfBirth)) {
      hasError.dateOfBirth = true
      $emit('update:formError', true)
    }
  }

  const validatePhone = () => {
    hasError.phone = false
    if (!isPhone(modelValue.physicsPerson.phone)) {
      hasError.phone = true
      $emit('update:formError', true)
    }
  }

  defineExpose({
    validateName,
    validateCpf,
    validateDateOfBirth,
    validatePhone
  })
</script>

<template>
  <InputType
    text="Nome"
    type="text"
    v-model="modelValue.physicsPerson.name"
    errorMessage="Digite um nome válido"
    :hasError="hasError.name"
    :onBlur="validateName"
    dataTest="physics-person__name"
  />
  <InputType
    text="CPF"
    type="text"
    v-model="modelValue.physicsPerson.cpf"
    errorMessage="O cpf deve ter 11 caracteres"
    :hasError="hasError.cpf"
    :onBlur="validateCpf"
    dataTest="physics-person__cpf"
  />
  <InputType
    text="Data de nascimento"
    type="date"
    v-model="modelValue.physicsPerson.dateOfBirth"
    errorMessage="Preencha uma data válida"
    :hasError="hasError.dateOfBirth"
    :onBlur="validateDateOfBirth"
    dataTest="physics-person__date"
  />
  <InputType
    text="Telefone"
    type="text"
    v-model="modelValue.physicsPerson.phone"
    errorMessage="o telefone deve apenas números e ter 11 dígitos com DDD"
    :hasError="hasError.phone"
    :onBlur="validatePhone"
    dataTest="physics-person__phone"
  />
</template>
