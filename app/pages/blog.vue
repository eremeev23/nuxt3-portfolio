<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('meta.blog') })
</script>

<template>
  <div class="gut py-10">
    <PageTitle :text="$t('blog.title')" />
  </div>
</template>
