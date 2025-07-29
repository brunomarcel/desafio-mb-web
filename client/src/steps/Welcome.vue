<script setup>
  import { ref, reactive } from 'vue'
  import InputType from '@/components/InputType.vue'
  import Header from '@/components/Header.vue'
  import { isEmail } from '@/commons/validate-field'
  import { STEPS_NAME } from '@/commons/steps-name'

  const props = defineProps(['modelValue'])
  const { modelValue } = props
  const $emit = defineEmits(['update:modelValue', 'goToStep'])
  const formError = ref(false)
  const hasError = reactive({
    email: false,
    type: false
  })
  const stepValues = reactive({
    email: modelValue?.email ?? '',
    type: modelValue?.type ?? ''
  })

  const handleGoToStep = () => {

    formError.value = false
    validateEmail()
    validateType()

    if (formError.value) return

    $emit('update:modelValue', {...modelValue, ...stepValues})
    $emit('goToStep', stepValues.type)
  }

  const validateEmail = () => {
    hasError.email = false

    if (!isEmail(stepValues.email)) {
      hasError.email = true
      formError.value = true
    }
  }

  const validateType = () => {
    hasError.type = false

    if (!stepValues.type) {
      hasError.type = true
      formError.value = true
    }
  }
</script>

<template>
  <Header
    step="1"
    text="Seja bem vindo(a)"
  />
  <main data-test="welcome">
    <InputType
      text="Endereço de e-mail"
      type="email"
      errorMessage="Digite um e-mail válido"
      :hasError="hasError.email"
      :onBlur="validateEmail"
      v-model="stepValues.email"
      dataTest="welcome__email"
    />
    <div
      :class="{ 'input-error': hasError.type }"
      class="wrapper-input"
      >
      <label class="welcome__radio">
        <input
          data-test="welcome__physics-person"
          class="welcome__radio-option"
          type="radio"
          name="type"
          :value="STEPS_NAME.PHYSICS_PERSON"
          @change="validateType"
          v-model="stepValues.type"
          required
        />
        <span>Pessoa Física</span>
      </label>
      <label class="welcome__radio">
        <input
          class="welcome__radio-option"
          type="radio"
          name="type"
          :value="STEPS_NAME.LEGAL_PERSON"
          @change="validateType"
          v-model="stepValues.type"
          required
        />
        <span>Pessoa Jurídica</span>
      </label>
      <span class="input-type__error-message">Escolha uma opção</span>
    </div>
    <button
      data-test="form-button__next"
      class="form-button form-button__primary"
      type="button"
      @click="handleGoToStep">
        Continuar
    </button>
  </main>
</template>

<style scoped>
  .welcome__radio {
    cursor: pointer;
  }
  .welcome__radio:first-child {
    padding-right: 16px;
  }
  .welcome__radio-option {
    margin-right: 4px;;
  }
</style>
