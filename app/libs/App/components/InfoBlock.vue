<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1 class="font-display font-black text-title text-accent">
    {{ t('placeholder.title') }}
  </h1>
  <p class="font-mono text-caption text-text2">
    {{ t('placeholder.subtitle') }}
  </p>
</template>
