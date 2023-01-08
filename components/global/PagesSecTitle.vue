<template>
  <h2 class="page-title">
    <span>#</span><slot/>
  </h2>
</template>

<style scoped>
.page-title {
  @apply mb-6 text-3xl
}

.page-title span {
  @apply text-blue
}
</style>