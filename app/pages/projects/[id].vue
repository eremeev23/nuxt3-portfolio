<script setup lang="ts">
const route = useRoute()
const id = computed(() => String(route.params.id))

useHead({ title: () => id.value })
</script>

<template>
  <div class="gut py-10">
    <PageTitle :text="id" />
  </div>
</template>
