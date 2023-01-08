<template>
  <h2 class="page-title">
    <span>#</span><slot/>
  </h2>
</template>

<style lang="scss" scoped>
.page-title {
  @apply text-2xl font-semibold mb-6 sm:text-4xl sm:mb-10;
  text-transform: uppercase;

  span {
    @apply text-blue
  }
}
</style>