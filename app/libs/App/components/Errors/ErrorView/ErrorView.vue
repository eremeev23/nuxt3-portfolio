<script setup lang="ts">
// Types
import type { CustomError } from '~/libs/App/components/Errors/types/custom-error.type.ts'

defineProps<{
  error?: CustomError
}>()
</script>

<template>
  <div
    v-if="error"
    class="lg:flex grow-1 w-full"
  >
    <div class="grow-1">
      <ErrorStatus :status="error.status" />
    </div>

    <aside class="error-menu">
      <ErrorInfo :error />

      <ErrorNavigation />
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.error-menu {
  @apply lg:h-full p-4 lg:p-6 lg:bw-l lg:b-solid b-line flex flex-col gap-6;
}
</style>
