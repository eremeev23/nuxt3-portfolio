<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('meta.home') })
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center gap-6 px-4 lg:px-16">
    <h1 class="font-display font-black text-title text-accent">
      {{ t('placeholder.title') }}
    </h1>
    <p class="font-ui text-caption text-secondary">
      {{ t('placeholder.subtitle') }}
    </p>
  </main>
</template>
