<script lang="ts" setup>
import { ComputedRef } from "vue";

interface IPops {
  input: {
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
const activeInput = ref(false);
const focusInput = ref(false);

const inputValue = computed({
  get() {
    return props.modelValue;
  },

  set(newValue:string) {
    emits('update:modelValue', newValue);
  }
})
</script>

<template>
  <div class="input-block">
    <input
      v-model="inputValue"
      class="input-block__input"
      :class="{'active':activeInput || inputValue, 'error': error, 'focus': focusInput}"
      :type="input.type"
      :name="input.name"
      :id="input.name"
      @focus="focusInput = true"
      @blur="focusInput = false"
    >

    <label class="input-block__label" :for="input.name">
      {{ input.label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.input-block {
  @apply relative w-full;

  &__input {
    @apply w-full py-3 px-3 border-2 border-[#fff] bg-dark text-sm sm:text-base sm:px-4 dark:bg-light dark:border-dark;
    transition: border-color .2s ease-in-out, color .2s ease-in-out;
  }

  &__label {
    position: absolute;
    padding: 0 4px;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    height: fit-content;
    pointer-events: none;
    transition: font-size .2s ease-in-out, top .2s ease-in-out, color .2s ease-in-out;

    @media screen and (max-width: 640px) {
      left: 12px;
      font-size: 14px;
    }
  }

  &__input.focus {
    @apply border-blue text-blue caret-blue;
  }

  &__input.focus + &__label {
    @apply text-blue;
    top: 1px;
    font-size: 12px;
  }

  &__input.active {
    @apply border-green text-green caret-green;
  }

  &__input.error {
    @apply border-red text-red caret-red;
  }

  &__input.active + &__label {
    @apply text-green;
    top: 1px;
    font-size: 12px;
  }

  &__input.error + &__label {
    @apply text-red;
  }
}
</style>
