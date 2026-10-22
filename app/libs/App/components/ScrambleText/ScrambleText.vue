<script lang="ts" setup>
// Constants
import { CHARS_MAP } from '~/libs/App/components/ScrambleText/constants/chars-map.const.ts'

type Props = {
  text: string
  tag?: string
  dotted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'span',
})

// Constants
const DURATION = 900
const LEAD = 250
const TICK = 45

// Utils
const { locale } = useI18n()
const { reducedMotion } = useReducedMotion()

// Layout
const fakeText = ref<{ real: string, fake: string | null }[][]>([])
const animationId = ref<number | null>(null)
const chars = computed(() => CHARS_MAP[locale.value] ?? CHARS_MAP.en)

// Functions
function getRandomChar(): string {
  return chars.value[Math.floor(Math.random() * chars.value.length)] ?? 'a'
}

function buildTextArr() {
  fakeText.value = (props.text).split(' ').map(w => [...w].map(real => ({ real, fake: null })))
}

function scrambleText() {
  cancelAnimationFrame(animationId.value ?? 0)

  if (reducedMotion.value) {
    return
  }

  const cells = fakeText.value.flat()
  const step = (DURATION - LEAD) / Math.max(cells.length - 1, 1)
  const start = performance.now()
  let lastTick = 0

  const frame = (now: number) => {
    const t = now - start
    const tick = now - lastTick >= TICK

    if (tick) {
      lastTick = now
    }

    let running = false
    cells.forEach((cell, i) => {
      if (t < LEAD + step * i) {
        running = true

        if (tick) {
          cell.fake = getRandomChar()
        }
      }
      else {
        cell.fake = null // settled on the real letter
      }
    })

    if (running) {
      animationId.value = requestAnimationFrame(frame)
    }
  }

  animationId.value = requestAnimationFrame(frame)
}

// Built in setup, so the server renders the real letters and only the scramble waits for the client.
buildTextArr()

// Lifecycle
onMounted(scrambleText)

onBeforeUnmount(() => cancelAnimationFrame(animationId.value ?? 0))

watch(() => props.text, () => {
  buildTextArr()
  nextTick(scrambleText)
})
</script>

<template>
  <span class="scramble-text">
    <component
      :is="tag"
      class="sr-only"
    >
      {{ text }}
    </component>

    <span aria-hidden="true">
      <template
        v-for="(word, w) in fakeText"
        :key="w"
      >
        <span class="scramble-text__placeholder">
          <span
            v-for="(cell, i) in word"
            :key="i"
            class="scramble-text__cell"
            :class="{ 'is-fake': cell.fake }"
          >
            <span class="scramble-text__real">{{ cell.real }}</span>

            <span
              v-if="cell.fake"
              class="scramble-text__fake"
            >
              {{ cell.fake }}
            </span>
          </span>
        </span>

        {{ w < fakeText.length - 1 ? ' ' : '' }}
      </template>

      <template v-if="dotted">
        <span
          class="text-accent"
          aria-hidden="true"
          data-testid="page-title-dot"
        >.</span>
      </template>
    </span>
  </span>
</template>

<style scoped lang="scss">
.scramble-text {
  &__placeholder {
    @apply inline-block;
  }

  &__cell {
    @apply relative inline-block cursor-text;

    &.is-fake .scramble-text__real {
      @apply text-transparent;
    }
  }

  &__fake {
    @apply absolute top-0 left-1/2 -translate-x-1/2;
  }
}
</style>
