<script setup lang="ts" generic="T extends string | number">
// Types
import type { SelectorProps } from './types/selector-props.type'

const props = defineProps<SelectorProps<T>>()

// Data
const model = defineModel<T>('modelValue', { required: true })

// Layout
const listId = useId()
const root = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const displayValue = computed(() => props.options.find(option => option.value === model.value)?.label)

// Functions
function toggleOptions() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function selectOption(selectedOptionValue: T) {
  model.value = selectedOptionValue
  close()
}

function handleOutsideClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) {
    close()
  }
}

function handleFocusOut(event: FocusEvent) {
  if (!root.value?.contains(event.relatedTarget as Node | null)) {
    close()
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))
</script>

<template>
  <div
    ref="root"
    class="selector"
    @keydown.esc="close"
    @focusout="handleFocusOut"
  >
    <button
      type="button"
      class="selector__trigger"
      :class="[triggerClass, { 'selector__trigger--open': isOpen }]"
      :aria-label="ariaLabel"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-controls="listId"
      @click="toggleOptions"
    >
      <slot
        name="trigger"
        :label="displayValue"
      >
        {{ displayValue }}
      </slot>

      <span
        class="selector__arrow"
        aria-hidden="true"
      >{{ isOpen ? '▴' : '▾' }}</span>
    </button>

    <ul
      v-show="isOpen"
      :id="listId"
      class="selector__options"
      :class="{ 'selector__options--up': dropUp, 'selector__options--right': align === 'right' }"
    >
      <li
        v-for="option in options"
        :key="option.value"
      >
        <button
          type="button"
          class="selector__option"
          :class="{ 'selector__option--active': option.value === model }"
          :aria-current="option.value === model ? 'true' : undefined"
          @click="selectOption(option.value)"
        >
          <slot
            name="option"
            :option="option"
          >
            {{ option.label }}
          </slot>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.selector {
  @apply relative flex;

  &__trigger,
  &__option {
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
  }

  &__trigger {
    @apply gap-2;

    &--open {
      @apply bg-surface text-fg;
    }
  }

  &__options {
    @apply absolute z-10 top-full left-0 w-max min-w-full max-h-[70dvh] overflow-y-auto m-0 p-0 list-none brut bg-bg;

    &--right {
      @apply left-auto -right-0.75;
    }

    &--up {
      @apply top-auto bottom-full;
    }
  }

  &__option {
    @apply flex items-center gap-2.5 min-h-10 w-full px-5 text-left whitespace-nowrap b-0 bg-transparent;
    @apply text-muted hover:bg-surface hover:text-fg;

    &--active {
      @apply text-accentText;
    }
  }
}
</style>
