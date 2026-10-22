<script setup lang="ts">
type Variant = 'default' | 'active' | 'soft'

const props = withDefaults(defineProps<{
  variant?: Variant
  /** Element to render; `button` gets a 44px touch target and aria-pressed. */
  as?: 'span' | 'li' | 'button'
}>(), {
  variant: 'default',
  as: 'span',
})

const variants: Record<Variant, string> = {
  default: 'border-line',
  active: 'border-accent text-accentText',
  soft: 'border-transparent bg-surface text-text2',
}
</script>

<template>
  <component
    :is="props.as"
    :type="props.as === 'button' ? 'button' : undefined"
    :aria-pressed="props.as === 'button' ? props.variant === 'active' : undefined"
    class="inline-flex items-center px-[13px] py-[9px] bw b-solid font-mono text-xs"
    :class="[variants[props.variant], { 'min-h-11 cursor-pointer': props.as === 'button' }]"
  >
    <slot />
  </component>
</template>
