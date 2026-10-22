<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('meta.home') })
</script>

<template>
  <div class="gut py-10">
    <PageTitle :text="$t('meta.home')" />
  </div>
</template>
