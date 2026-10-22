<script setup lang="ts">
// Types
import type { Variant } from '~/libs/App/components/BrutButton/types/brut-button-props.type.ts'

// Constants
import { HttpStatusCode } from 'axios'

type Action = {
  label: string
  variant?: Variant
  /** A link home or elsewhere; without it the button retries the failed route. */
  to?: string
  sticky?: boolean
}

const props = defineProps<{
  status?: number
}>()

/*
 * One view per status with copy of its own (`errors.title.<status>` and the
 * rest); any other status (400, 401, 502…) shows the generic server error.
 */
const ACTIONS: Record<number, Action[]> = {
  [HttpStatusCode.Forbidden]: [
    { label: 'home.backHome', variant: 'line', to: '/' },
  ],
  [HttpStatusCode.NotFound]: [
    { label: 'errors.backHome', to: '/', sticky: true },
    { label: 'projects.allProjects', variant: 'line', to: '/projects' },
  ],
  [HttpStatusCode.InternalServerError]: [
    { label: 'common.tryAgain', sticky: true },
    { label: 'home.backHome', variant: 'line', to: '/' },
  ],
  [HttpStatusCode.ServiceUnavailable]: [
    { label: 'common.tryAgain', sticky: true },
    { label: 'home.backHome', variant: 'line', to: '/' },
  ],
}

// Utils
const route = useRoute()

// Layout
const code = computed(() => (
  props.status && ACTIONS[props.status] ? props.status : HttpStatusCode.InternalServerError
))
const digits = computed(() => [...String(code.value)])
const actions = computed(() => ACTIONS[code.value]!)

// Functions
function retry() {
  clearError({ redirect: route.fullPath })
}

// Lifecycle
onBeforeUnmount(clearError)
</script>

<template>
  <div class="error-view">
    <h2 class="w-full text-left text-accentText text-sm font-mono">
      {{ $t('errors.self', 1).toUpperCase() }} · {{ $t(`errors.title.${code}`).toUpperCase() }}
    </h2>

    <h3 class="text-4xl glitch-text">
      {{ digits[0] }}<span class="bg-accent text-onAccent">{{ digits[1] }}</span>{{ digits[2] }}
    </h3>

    <PageTitle :text="$t(`errors.description.${code}`)" />

    <ScrambleText
      class="text-2xl"
      :text="$t(`errors.moreInfo.${code}`)"
    />

    <div class="w-full flex gap-4">
      <Btn
        v-for="action in actions"
        :key="action.label"
        class="w-full lg:w-fit"
        :variant="action.variant"
        :label="$t(action.label)"
        :to="action.to"
        :sticky="{ enabled: !!action.sticky, maxTransform: 16 }"
        @click="action.to ? undefined : retry()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-view {
  @apply p-4 lg:p-x-8 lg:p-y-6 flex flex-col gap-6 lg:gap-10 items-center lg:items-start;
}

h3.glitch-text,
h3.glitch-text span {
  @apply flex;
  font: 900 clamp(140px, 25vw, 340px) / 0.78 var(--f-display);
  line-height: 300px;
}
</style>
