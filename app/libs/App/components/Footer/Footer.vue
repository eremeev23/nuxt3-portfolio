<script setup lang="ts">
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <div class="footer__title">
      {{ $t('footer.title').toUpperCase() }}
    </div>

    <div class="footer__contacts">
      <a
        href="mailto:eremeev.maxim28@gmail.com"
        class="lg:text-lg"
      >
        eremeev.maxim28@gmail.com
      </a>

      <div class="text-xs">
        <a
          href="https://github.com/eremeev23"
          target="_blank"
          rel="noopener"
        >
          {{ $t('links.github').toUpperCase() }}
        </a>
        /
        <a
          href="https://www.linkedin.com/in/maksim-eremeev-6446101a9/"
          target="_blank"
          rel="noopener"
        >
          {{ $t('links.linkedin').toUpperCase() }}
        </a>
        /
        <a
          href="https://t.me/eremeev23"
          target="_blank"
          rel="noopener"
        >
          {{ $t('links.telegram').toUpperCase() }}
        </a>
      </div>

      <p class="text-sm lg:text-lg">
        {{ $t('footer.copyright', { year }) }}
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @apply bg-accent text-onAccent bw-t b-solid b-line p-7 flex justify-between items-center;

  &__title {
    @apply text-5xl font-900 max-w-120;
  }

  &__contacts {
    @apply font-mono flex flex-col items-end gap-2;
  }

  a {
    @apply transition-colors;

    @apply text-onAccent underline-offset-3;

    &:hover {
      @apply underline;
    }
  }

  @media (max-width: 980px) {
    @apply flex-col items-start gap-2 p-5;

    &__title {
      @apply text-center text-2xl;
    }

    &__contacts {
      @apply w-full items-start;

      p {
        @apply m-t-2 w-full text-center;
      }
    }
  }
}
</style>
