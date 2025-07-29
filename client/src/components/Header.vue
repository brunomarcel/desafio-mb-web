<script setup>
  defineProps(['step', 'text'])
</script>

<template>
  <header>
    <p data-test="header__step-Text">Etapa <span class="header__step">{{ step }}</span> de 4</p>
    <h2 data-test="header__text">{{ text }}</h2>
  </header>
</template>

<style scoped>
  .header__step {
    color: var(--primary)
  }
</style>
