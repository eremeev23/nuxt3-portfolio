<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('meta.projects') })
</script>

<template>
  <div class="gut py-10">
    <PageTitle :text="$t('projects.title')" />
  </div>
</template>
