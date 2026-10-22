<script setup lang="ts">
const pages = useNavPages()
</script>

<template>
  <div class="error-info">
    <div class="error-info__header error-info__item">
      <span>
        {{ $t('errors.whereToGo').toUpperCase() }}
      </span>

      <span>
        {{ $t('errors.routes', pages.length).toUpperCase() }}
      </span>
    </div>

    <nuxt-link-locale
      v-for="page in pages"
      :key="page.path"
      class="nav-cell error-nav-cell"
      :to="page.path"
    >
      <span class="error-nav-cell__name uppercase">
        {{ page.name }} <span class="m-l-2">→</span>
      </span>

      <span>
        {{ page.path }}
      </span>
    </nuxt-link-locale>
  </div>
</template>

<style lang="scss" scoped>
.error-nav-cell {
  @apply 'b-l-0! lowercase!';
  @apply flex justify-between;

  &:not(:last-child) {
    @apply bw-b;
  }

  &__name {
    @apply font-display text-base text-fg font-900;
  }
}
</style>
