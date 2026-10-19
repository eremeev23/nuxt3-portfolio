<script setup lang="ts">
/*
 * The list is rendered twice and the track slides by -50%, so the loop is
 * seamless. The copy is aria-hidden; the animation pauses on hover and is off
 * under prefers-reduced-motion.
 */
withDefaults(defineProps<{
  items: string[]
  /** One full loop. */
  duration?: string
}>(), {
  duration: '24s',
})
</script>

<template>
  <div class="marquee overflow-hidden py-[11px] border-b-2 border-line bg-fill text-onFill">
    <div
      class="marquee-track flex w-max whitespace-nowrap font-display font-800 text-xl tracking-[.05em]"
      :style="{ animationDuration: duration }"
    >
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex gap-9 pr-9 m-0 p-0 list-none"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <li
          v-for="(item, i) in items"
          :key="i"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee 24s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
