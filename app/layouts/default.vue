<script setup lang="ts">
</script>

<template>
  <div class="site ">
    <Header />

    <main class="grow-1 flex w-full">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
$frame-rules-off: 1024px;

.site {
  @apply mx-auto max-w-[1880px] min-h-screen bw-x b-line;
  @apply flex flex-col;
  min-height: 100dvh;

  @media (max-width: $frame-rules-off) {
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
