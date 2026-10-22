<script setup lang="ts">
// Types
import type { CustomError } from '~/libs/App/components/Errors/types/custom-error.type.ts'

// Constants
import { HttpStatusCode } from 'axios'

// Functions
import { getRouteSuggestion } from '~/libs/App/components/Errors/functions/getRouteSuggestion.ts'

const props = defineProps<{
  error?: CustomError
}>()

// Utils
const { locales } = useI18n()
const { $p } = useNuxtApp()
const pages = useNavPages()

// Layout
const method = computed(() => props.error?.method ?? 'GET')
const suggestion = computed(() => {
  if (props.error?.status !== HttpStatusCode.NotFound) {
    return undefined
  }

  const path = getRouteSuggestion(
    props.error.url,
    pages.value.map(page => page.path),
    locales.value.map(item => item.code),
  )

  return path ? { to: $p(path), text: path } : undefined
})
</script>

<template>
  <div class="error-info hidden lg:block">
    <div class="error-info__header error-info__item">
      <span>
        {{ $t('errors.request').toUpperCase() }}
      </span>

      <span>
        {{ error?.status }}
      </span>
    </div>

    <div class="error-info__item">
      <span>
        {{ method }}
      </span>

      <span>
        {{ error?.url }}
      </span>
    </div>

    <div class="error-info__item">
      <span>
        {{ $t('errors.status').toUpperCase() }}
      </span>

      <span>
        {{ error?.status }} · {{
          $te(`errors.code.${error?.status}`)
            ? $t(`errors.code.${error?.status}`)
            : error?.statusText
        }}
      </span>
    </div>

    <div
      v-if="suggestion"
      class="error-info__item"
    >
      <span>
        {{ $t('errors.didYouMean') }} <NuxtLink
          :to="suggestion.to"
          class="text-accent underline"
        >{{ suggestion.text }}</NuxtLink>?
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.error-info {
  @apply w-full lg:w-80 brut font-mono text-xs text-muted;

  &__item {
    @apply m-x-4 p-y-2 flex justify-between;

    &:not(:last-child) {
      @apply bw-b b-solid b-line;
    }
  }

  &__header {
    @apply m-x-0 font-bold;

    span {
      @apply p-x-4;
    }
  }
}
</style>
