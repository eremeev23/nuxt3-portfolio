<script setup lang="ts">
/* Full-bleed accent band: `title` on the left, `side` (contacts, actions) on the right. */
</script>

<template>
  <section class="flex flex-wrap items-end justify-between gap-6 py-10 px-4 lg:px-16 bg-accent text-onAccent">
    <h2 class="font-display font-900 text-[length:clamp(30px,4.4vw,50px)] leading-[.95] tracking-[-.035em] uppercase">
      <slot name="title" />
    </h2>
    <div
      v-if="$slots.side"
      class="text-right font-mono text-xs leading-[2]"
    >
      <slot name="side" />
    </div>
  </section>
</template>
