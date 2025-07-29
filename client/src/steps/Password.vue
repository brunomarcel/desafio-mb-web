<script setup>
  import { ref, reactive, inject } from 'vue'
  import InputType from '@/components/InputType.vue'
  import Header from '@/components/Header.vue'
  import { isPassword } from '@/commons/validate-field'
  import { STEPS_NAME } from '@/commons/steps-name'

  const props = defineProps(['modelValue'])
  const { modelValue } = props
  const $emit = defineEmits(['update:modelValue', 'goToStep'])
  const formError = ref(false)
  const hasError = reactive({
    password: false,
  })
  const stepValues = reactive({
    password: modelValue?.password ?? ''
  })

  const handleGoToStep = (stepName, back) => {
    if(back) {
      $emit('update:modelValue', {...modelValue, ...stepValues})
      $emit('goToStep', stepName)
      return
    }
    formError.value = false
    validatePassword()

    if (formError.value) return

    $emit('update:modelValue', {...modelValue, ...stepValues})
    $emit('goToStep', stepName)
  }

  const validatePassword = () => {
    hasError.password = false

    if (!isPassword(stepValues.password)) {
      hasError.password = true
      formError.value = true
    }
  }
</script>

<template>
  <Header
    step="3"
    text="Senha de acesso"
  />
  <main data-test="password">
    <InputType
      text="Sua senha"
      type="password"
      v-model="stepValues.password"
      errorMessage="A senha deve ter no mínimo 8 caracteres e conter numeros e/ou letras"
      :hasError="hasError.password"
      :onBlur="validatePassword"
      dataTest="password__text"
    />
    <button
      data-test="form-button__previous"
      class="form-button form-button__outline"
      type="button"
      @click="handleGoToStep(modelValue?.type, true)">
        Voltar
    </button>
    <button
      data-test="form-button__next"
      class="form-button form-button__primary"
      type="button"
      @click="handleGoToStep(STEPS_NAME.REVIEW)">
        Continuar
      </button>
  </main>
</template>
