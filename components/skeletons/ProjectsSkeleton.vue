<template>
  <div class="grid grid-cols-custom-5 gap-6">
    <div
      class="skeleton-box skeleton-element"
      v-for="num in 8"
      :key="num"
    ></div>
  </div>
</template>

<style>
.skeleton-box {
  height: 400px !important;
}
</style>