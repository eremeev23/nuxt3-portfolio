<script setup lang="ts">
defineProps<{
  controls?: string
}>()

const open = defineModel<boolean>({ default: false })

// Layout
const el = ref<HTMLButtonElement | null>(null)

defineExpose({ el })
</script>

<template>
  <button
    ref="el"
    type="button"
    class="nav-cell burger-button"
    :class="{ 'burger-button--open': open }"
    aria-haspopup="dialog"
    :aria-expanded="open"
    :aria-controls="controls"
    :aria-label="open ? $t('menu.close') : $t('menu.open')"
    @click="open = !open"
  >
    <span
      class="burger-button__icon"
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  </button>
</template>

<style scoped lang="scss">
.burger-button {
  @apply relative justify-center px-0 py-0;

  &--open {
    @apply bg-accent text-onAccent hover:bg-accent hover:text-onAccent;
  }

  &__icon {
    @apply relative block w-5 h-5;

    > span {
      @apply absolute left-0 w-full bg-current;
      top: calc(50% - var(--b) / 2);
      height: var(--b);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;

      &:nth-child(1) {
        transform: translateY(-6px);
      }

      &:nth-child(3) {
        transform: translateY(6px);
      }
    }
  }

  &--open &__icon > span {
    &:nth-child(1) {
      transform: rotate(45deg);
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__icon > span {
      transition: none;
    }
  }
}
</style>
