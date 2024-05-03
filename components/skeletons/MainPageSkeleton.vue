<template>
  <div class="flex items-center w-full flex-col gap-10 page-section lg:flex-row lg:gap-4">
    <div class="mt-[40px] flex-[2] flex flex-col gap-3 w-full">
      <div class="h-[40px] w-6/12 skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
    </div>

    <div class="hidden flex-none flex justify-center lg:block lg:flex-1">
      <div class="skeleton-element rounded relative w-[280px] h-[420px]"></div>
    </div>
  </div>

  <div class="page-section">
    <div class="skeleton-title skeleton-element mb-6"></div>

    <div class="grid grid-cols-custom gap-4">
      <div class="flex-1 max-h-[200px] skeleton-box skeleton-element"></div>
      <div class="flex-1 max-h-[200px] skeleton-box skeleton-element"></div>
      <div class="flex-1 max-h-[200px] skeleton-box skeleton-element"></div>
      <div class="flex-1 max-h-[200px] skeleton-box skeleton-element"></div>
      <div class="flex-1 max-h-[200px] skeleton-box skeleton-element"></div>
    </div>
  </div>

  <div class="page-section">
    <div class="skeleton-title skeleton-element mb-6"></div>

    <div class="flex flex-col gap-2 max-w-[640px] mb-6">
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
    </div>

    <div class="flex flex-col gap-2 max-w-[640px]">
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
      <div class="skeleton-text skeleton-element"></div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  div {
    animation: skeleton 1s infinite;
  }
}
</style>
