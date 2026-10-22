<script setup lang="ts">
// Utils
const colorMode = useColorMode()

// Functions
function handleChangeTheme() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button
    type="button"
    class="nav-cell theme-toggle"
    :title="$t('a11y.switchTheme')"
    @click="handleChangeTheme"
  >
    <!-- Dark theme on: offers the light one. -->
    <span class="theme-toggle__state theme-toggle__state--to-light">
      <svg
        class="theme-toggle__icon"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle
          cx="10"
          cy="10"
          r="4"
        />
        <path d="M10 0v3M10 17v3M0 10h3M17 10h3M2.9 2.9l2.1 2.1M15 15l2.1 2.1M2.9 17.1 5 15M15 5l2.1-2.1" />
      </svg>
      <span class="theme-toggle__label">{{ $t('theme.light') }}</span>
    </span>

    <!-- Light theme on: offers the dark one. -->
    <span class="theme-toggle__state theme-toggle__state--to-dark">
      <svg
        class="theme-toggle__icon"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M17.5 12.5A8 8 0 0 1 7.5 2.5a8 8 0 1 0 10 10Z" />
      </svg>
      <span class="theme-toggle__label">{{ $t('theme.dark') }}</span>
    </span>
  </button>
</template>

<style scoped lang="scss">
$compact: 980px;

:global(.light .theme-toggle .theme-toggle__state--to-light) {
  display: none;
}

:global(.light .theme-toggle .theme-toggle__state--to-dark) {
  display: flex;
}

.theme-toggle {
  &__state {
    @apply items-center gap-2;
    display: flex;

    &--to-dark {
      display: none;
    }
  }

  &__icon {
    @apply shrink-0 w-4 h-4;
    stroke-width: var(--b);
    stroke-linecap: square;
    stroke-linejoin: miter;
  }

  @media (max-width: $compact) {
    @apply justify-center px-0 py-0;

    &__icon {
      @apply w-5 h-5;
    }

    &__label {
      @apply sr-only;
    }
  }
}
</style>
