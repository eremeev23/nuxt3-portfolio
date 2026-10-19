<script setup lang="ts">
import InfoBlock from '~/libs/App/components/InfoBlock.vue'

const { t } = useI18n()

useHead({ title: () => t('meta.home') })
</script>

<template>
  <main class="min-h-screen flex flex-col justify-center gap-6 px-4 lg:px-16">
    <InfoBlock />
  </main>
</template>
