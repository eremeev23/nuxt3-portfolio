<script setup lang="ts">
// Types
import type { CustomError } from '~/libs/App/components/Errors/types/custom-error.type.ts'

defineProps<{ error: CustomError }>()
</script>

<template>
  <NuxtLayout>
    <ErrorView :error />
  </NuxtLayout>
</template>
