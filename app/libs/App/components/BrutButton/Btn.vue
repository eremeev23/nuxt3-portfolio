<script setup lang="ts">
// Types
import type { ComponentPublicInstance } from 'vue'
import type { BrutButtonProps } from '~/libs/App/components/BrutButton/types/brut-button-props.type.ts'

// Constants
import { BASE, VARIANTS } from '~/libs/App/components/BrutButton/constants/btn-variants.const.ts'

const props = withDefaults(defineProps<BrutButtonProps>(), {
  variant: 'accent',
  to: undefined,
  type: 'button',
  sticky: () => {
    return {
      enabled: false,
      maxTransform: 16,
    }
  },
})

// Components
const NuxtLinkLocale = resolveComponent('NuxtLinkLocale')

/*
 * Layout
 * A <button> or, with `to`, the NuxtLinkLocale instance; `target` is the element either way.
 */
const btnEl = ref<HTMLElement | ComponentPublicInstance>()
const target = computed(() => unrefElement(btnEl))
const btnTransformX = ref(0)
const btnTransformY = ref(0)

// Utils
const { reducedMotion } = useReducedMotion()
const { x: btnX, y: btnY, width: btnW, height: btnH } = useElementBounding(target)
const { x: mouseX, y: mouseY } = useMouse({
  target,
})

// Functions
function stick() {
  // Stick setup
  const btnMidX = btnX.value + btnW.value / 2
  const btnMidY = btnY.value + btnH.value / 2
  const percent = 0.16

  // Calculations
  const xDiff = mouseX.value - btnMidX
  const yDiff = mouseY.value - btnMidY

  const xTransform
    = Math.min(Math.max(xDiff * percent, -props.sticky.maxTransform!), props.sticky.maxTransform!)
  const yTransform
    = Math.min(Math.max(yDiff * percent, -props.sticky.maxTransform!), props.sticky.maxTransform!)

  btnTransformX.value = xTransform
  btnTransformY.value = yTransform
}

function cancelStick() {
  btnTransformX.value = 0
  btnTransformY.value = 0
}

// Listeners
useEventListener(target, 'mousemove', () => {
  if (props.sticky.enabled && !reducedMotion.value) {
    stick()
  }
})
</script>

<template>
  <component
    :is="props.to ? NuxtLinkLocale : 'button'"
    ref="btnEl"
    :to="props.to"
    :type="props.to ? undefined : props.type"
    :class="[BASE, VARIANTS[props.variant], ui?.buttonClass]"
    :style="{
      transform: `translate(${btnTransformX}px, ${btnTransformY}px)`,
      transition: 'transform 0.05s linear',
    }"
    @mouseleave="cancelStick"
  >
    <slot name="prepend">
      <span :class="prependIcon" />
    </slot>

    <slot name="default">
      <span :class="ui?.labelClass">
        {{ label }}
      </span>
    </slot>

    <slot name="append">
      <span :class="appendIcon" />
    </slot>
  </component>
</template>
