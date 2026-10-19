<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type Variant = 'accent' | 'line' | 'white'

const props = withDefaults(defineProps<{
  variant?: Variant
  /** Renders a locale-aware link instead of a <button>. */
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'accent',
  to: undefined,
  type: 'button',
})

const NuxtLinkLocale = resolveComponent('NuxtLinkLocale')

const base = 'inline-flex items-center gap-2 min-h-11 px-5 py-3.5 font-mono font-800 text-xs tracking-[.03em] '
  + 'no-underline cursor-pointer transition-colors'

const variants: Record<Variant, string> = {
  accent: 'bg-accent text-onAccent hover:brightness-108',
  line: 'brut text-muted hover:text-fg hover:border-fg',
  white: 'border-2 border-onFill text-onFill hover:bg-onFill hover:text-fill',
}
</script>

<template>
  <component
    :is="props.to ? NuxtLinkLocale : 'button'"
    :to="props.to"
    :type="props.to ? undefined : props.type"
    :class="[base, variants[props.variant]]"
  >
    <slot />
  </component>
</template>
