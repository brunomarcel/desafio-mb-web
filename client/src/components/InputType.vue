<script setup>
  const props = defineProps([
    'modelValue',
    'text',
    'type',
    'errorMessage',
    'hasError',
    'onBlur',
    'dataTest'
  ])
  const $emit = defineEmits(['update:modelValue'])

  const onInput = event => {
    $emit('update:modelValue', event.target.value)
  }
</script>

<template>
  <label
    :class="{ 'input-error': hasError }"
    class="wrapper-input input-type">
    <span class="input-type__label">{{ text }}</span>
    <input
      class="input-type__field"
      :type="type"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      :data-test="dataTest"
      required
    />
    <span
      class="input-type__error-message">{{ errorMessage }}</span>
  </label>
</template>

<style scoped>
  .input-type,
  .input-type__label {
    display: block;
  }
  .input-type__field {
    border-radius: 4px;
    border: 1px solid var(--vt-c-black);
    height: 36px;
    margin: 8px 0 0;
    width: 100%;
  }
  .input-error .input-type__field {
    border-color: red
  }

</style>
