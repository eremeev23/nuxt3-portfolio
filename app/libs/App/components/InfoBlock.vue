<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <h1 class="font-display font-black text-title text-accent">
    {{ t('placeholder.title') }}
  </h1>
  <p class="font-ui text-caption text-secondary">
    {{ t('placeholder.subtitle') }}
  </p>
</template>
