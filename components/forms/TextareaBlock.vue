<script lang="ts" setup>
import { ComputedRef } from "vue";

interface IPops {
  area: {
    name: string,
    type: string,
    label: string | ComputedRef<string>
  },
  modelValue: string,
  startValue: string,
  error: boolean
}

const props = defineProps<IPops>();
const emits = defineEmits(['update:modelValue'])

// Layout
const activeArea = ref(false);
const focusArea = ref(false);

const areaValue = computed({
  get() {
    return props.modelValue;
  },

  set(newValue:string) {
    emits('update:modelValue', newValue);
  }
})
</script>

<template>
  <div class="textarea-block">
    <textarea
        v-model="areaValue"
        class="textarea-block__textarea"
        :class="{'active':activeArea || areaValue, 'error': error, 'focus': focusArea}"
        :name="area.name"
        :id="`textarea_${area.name}`"
        @focus="focusArea = true"
        @blur="focusArea = false"
    />

    <label class="textarea-block__label" :for="area.name">
      {{ area.label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.textarea-block {
  @apply relative w-full;

  &__textarea {
    @apply w-full h-24 py-3 px-3 py-3 px-4 border-2 bg-dark dark:bg-light dark:border-dark border-[#fff] transition-colors sm:px-4;
    outline: none;
    resize: none;
  }

  &__label {
    position: absolute;
    padding: 0 4px;
    left: 16px;
    top: 25px;
    transform: translateY(-50%);
    height: fit-content;
    pointer-events: none;
    transition: font-size .2s ease-in-out, top .2s ease-in-out, color .2s ease-in-out;

    @media screen and (max-width: 640px) {
      top: 22px;
      left: 12px;
      font-size: 14px;
    }
  }

  &__textarea.focus {
    @apply border-blue text-blue caret-blue;
  }

  &__textarea.focus + &__label {
    @apply text-blue;
    top: 1px;
    font-size: 12px;
  }

  &__textarea.active {
    @apply border-green text-green caret-green;
  }

  &__textarea.error {
    @apply border-red text-red caret-red;
  }

  &__textarea.active + &__label {
    @apply text-green;
    top: 1px;
    font-size: 12px;
  }

  &__textarea.error + &__label {
    @apply text-red;
  }
}
</style>
