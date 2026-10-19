<script setup lang="ts">
withDefaults(defineProps<{
  as?: 'h2' | 'h3' | 'h4'
}>(), {
  as: 'h2',
})
</script>

<template>
  <component
    :is="as"
    class="font-display font-900 text-section uppercase tracking-[-.02em]"
  >
    <slot />
  </component>
</template>
