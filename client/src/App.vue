<script setup>
  import { reactive, ref, defineAsyncComponent, onMounted } from 'vue';
  import { STEPS_NAME } from './commons/steps-name';

  const currentStep = ref(STEPS_NAME.WELCOME)
  const steps = {
    [STEPS_NAME.WELCOME]: defineAsyncComponent(() => import('./steps/Welcome.vue')),
    [STEPS_NAME.PHYSICS_PERSON]: defineAsyncComponent(() => import('./steps/PhysicsPerson.vue')),
    [STEPS_NAME.LEGAL_PERSON]: defineAsyncComponent(() => import('./steps/LegalPerson.vue')),
    [STEPS_NAME.PASSWORD]: defineAsyncComponent(() => import('./steps/Password.vue')),
    [STEPS_NAME.REVIEW]: defineAsyncComponent(() => import('./steps/Review.vue')),
  }
  const formData = reactive({
    email: '',
    type: '',
    password: '',
    physicsPerson: {},
    legalPerson: {}
  })

  onMounted(() => {
    const formDataFromCache = localStorage.getItem('formData')
    if(formDataFromCache)
      Object.assign(formData, JSON.parse(formDataFromCache))

    const stepNameFromCache = localStorage.getItem('stepName')
    if(stepNameFromCache)
      currentStep.value = stepNameFromCache
  })

  const goToStep = (stepName) => {
    if (steps[stepName]) {
      currentStep.value = stepName
      localStorage.setItem('stepName', stepName)
    }
  }

  const handleUpdate = updatedData => {
    const formDataStringify = JSON.stringify(formData)
    const updatedDataStringify = JSON.stringify(updatedData)

    if(formDataStringify !== updatedDataStringify){
      Object.assign(formData, updatedData)
      localStorage.setItem('formData', JSON.stringify(formData))
    }
  }
</script>

<template>
  <div
    data-test="app"
  >
    <component
    :is="steps[currentStep]"
    :modelValue="formData"
    @update:modelValue="handleUpdate"
    @goToStep="goToStep"
    />
  </div>
</template>
