<script setup lang="ts">
/* Striped placeholder for media that is not there yet. Size it from outside. */
defineProps<{
  caption?: string
}>()

const captionClass = 'font-mono text-[10px] tracking-[.06em] text-muted'
</script>

<template>
  <div
    class="stripe flex items-center justify-center p-3 text-center"
    :class="captionClass"
  >
    <slot>{{ caption }}</slot>
  </div>
</template>
