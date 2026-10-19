<script setup lang="ts">
/* Logo, variant 02: EREME[D]EV with the D on the fill colour. */
const { t } = useI18n()
</script>

<template>
  <span
    role="img"
    :aria-label="t('a11y.logo')"
    class="inline-block whitespace-nowrap font-display font-900 text-[19px] tracking-[-.035em] uppercase"
  >EREME<span class="px-1 mx-px bg-fill text-bg">D</span><span class="text-accent">EV</span></span>
</template>
