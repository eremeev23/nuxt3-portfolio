<script setup lang="ts">
type Size = 'xl' | 'xxl'

type Props = {
  text: string
  size?: Size
  tag?: 'h1' | 'h2'
}

withDefaults(defineProps<Props>(), {
  size: 'xl',
  tag: 'h1',
})

const sizes: Record<Size, string> = {
  xl: 'text-[length:clamp(24px,7vw,88px)]',
  xxl: 'text-[length:clamp(56px,9.4vw,112px)] !tracking-[-.05em]',
}
</script>

<template>
  <component
    :is="tag"
    class="h-page flex items-end"
    :class="sizes[size]"
  >
    <ScrambleText
      :text="text"
      dotted
    />
  </component>
</template>
