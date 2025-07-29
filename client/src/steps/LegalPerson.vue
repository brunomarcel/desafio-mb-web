<script setup>
  import { ref, reactive, inject } from 'vue'
  import Header from '@/components/Header.vue'
  import LegalPersonForm from '@/components/LegalPersonForm.vue'
  import { STEPS_NAME } from '@/commons/steps-name'

  const $emit = defineEmits(['update:modelValue', 'goToStep'])
  const props = defineProps(['modelValue'])
  const { modelValue } = props
  const form = ref(null)
  const formError = ref(false)
  const stepValues = reactive({
    legalPerson: {
      registeredName: modelValue?.legalPerson?.registeredName ?? '',
      cnpj: modelValue?.legalPerson?.cnpj ?? '',
      openingDate: modelValue?.legalPerson?.openingDate ?? '',
      phone: modelValue?.legalPerson?.phone ?? ''
    }
  })
  const handleGoToStep = (stepName, back) => {
    if(back) {
      $emit('update:modelValue', {...modelValue, ...stepValues})
      $emit('goToStep', stepName)
      return
    }
    formError.value = false
    form.value?.validateRegisteredName()
    form.value?.validateCnpj()
    form.value?.validateOpeningDate()
    form.value?.validatePhone()

    if (formError.value) return

    $emit('update:modelValue', {...modelValue, ...stepValues})
    $emit('goToStep', stepName)
  }
</script>

<template>
  <Header
    step="2"
    text="Pessoa Jurídica"
  />
  <main data-test="legal-person">
    <LegalPersonForm
      ref="form"
      v-model="stepValues"
      v-model:formError="formError"
    />
    <button
      data-test="form-button__previous"
      class="form-button form-button__outline"
      type="button"
      @click="handleGoToStep(STEPS_NAME.WELCOME, true)">
        Voltar
    </button>
    <button
      data-test="form-button__next"
      class="form-button form-button__primary"
      type="button"
      @click="handleGoToStep(STEPS_NAME.PASSWORD)">
        Continuar
    </button>
  </main>
</template>
