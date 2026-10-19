<script setup lang="ts">
type Variant = 'fill' | 'line'

const props = withDefaults(defineProps<{
  variant?: Variant
}>(), {
  variant: 'fill',
})

const variants: Record<Variant, string> = {
  fill: 'bg-accent text-onAccent',
  line: 'brut text-text2',
}
</script>

<template>
  <span
    class="inline-block px-2.5 py-1.5 font-mono font-800 text-[11px] tracking-[.02em]"
    :class="variants[props.variant]"
  >
    <slot />
  </span>
</template>
