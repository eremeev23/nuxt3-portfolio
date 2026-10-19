<script setup lang="ts">
type Size = 'xl' | 'xxl'

const props = withDefaults(defineProps<{
  size?: Size
  as?: 'h1' | 'h2'
}>(), {
  size: 'xl',
  as: 'h1',
})

const sizes: Record<Size, string> = {
  xl: 'text-[length:clamp(52px,7.4vw,88px)]',
  xxl: 'text-[length:clamp(56px,9.4vw,112px)] !tracking-[-.05em]',
}
</script>

<template>
  <component
    :is="props.as"
    class="h-page"
    :class="sizes[props.size]"
  >
    <slot /><span
      class="text-accent"
      aria-hidden="true"
      data-testid="page-title-dot"
    >.</span>
  </component>
</template>
