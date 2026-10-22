<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('meta.contacts') })
</script>

<template>
  <div class="gut py-10">
    <PageTitle :text="$t('contacts.title')" />
  </div>
</template>
