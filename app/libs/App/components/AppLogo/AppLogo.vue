<template>
  <span
    role="img"
    :aria-label="$t('a11y.logo')"
    class="inline-block whitespace-nowrap font-display font-900 text-[19px] tracking-[-.035em] uppercase"
  >EREME<span class="px-1 mx-px bg-accent text-onAccent d">D</span><span class="text-accent">EV</span></span>
</template>

<style lang="scss" scoped>
.d {
  animation: logoAnimation 1s linear infinite;
}

@keyframes logoAnimation {
  0% {
    @apply bg-transparent;
  }
  50% {
    @apply bg-accent;
  }
  100% {
    @apply bg-transparent;
  }
}
</style>
