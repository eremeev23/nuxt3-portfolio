<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'span',
})
</script>

<template>
  <component
    :is="as"
    class="label"
  >
    <slot />
  </component>
</template>
