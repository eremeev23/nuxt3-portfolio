<script lang="ts" setup>
import { ComputedRef } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { useContactsStore } from "~/stores/contactsStore";
import { useHeaderStore } from "~/stores/headerStore";
import { useGlobalStore } from "~/stores/globalStore";

// Components
import InputBlock from '~/components/forms/InputBlock.vue';
import TextareaBlock from '~/components/forms/TextareaBlock.vue';

interface IInput {
  name: string;
  type: string;
  label: string | ComputedRef<string>;
  value: string;
  error: boolean;
}

const props = defineProps<{
  formActive: boolean;
  formValid: boolean;
}>()

const emits = defineEmits(['activeStatus', 'validStatus']);

// Stores
const { currentLang } = storeToRefs(useHeaderStore());
const { FEEDBACK_POST_REQUEST } = useContactsStore();

// Layout
const data = reactive({
  inputs: [
    {
      name: 'email',
      type: 'email',
      label: computed(():string => currentLang.value === 'eng' ? 'Your e-mail' : 'Ваша эл.почта'),
      value: '',
      error: false,
    },
    {
      name: 'name',
      type: 'text',
      label: computed(():string => currentLang.value === 'eng' ? 'Your name' : 'Ваше имя'),
      value: '',
      error: false,
    }
  ] as IInput[],
  textareaData: {
    name: 'message',
    type: 'textarea',
    label: computed(():string => currentLang.value === 'eng' ? 'Your message' : 'Ваше сообщение'),
    value: '',
    error: false,
  } as IInput,
})

const submitButtonText = computed(() => currentLang.value === 'eng' ? 'SEND' : 'ОТПРАВИТЬ')

// Functions
function validateInput(value: string, input: IInput) {
  const i = data.inputs.indexOf(input);

  emits('activeStatus', true);

  switch (input.type) {
    case 'email':
      data.inputs[i].error = !/.+@.+\..+/i.test(value);
      break;
    case 'text':
      data.inputs[i].error = !value.trim().length;
      break;
    case 'textarea':
      data.textareaData.error = !value.trim().length;
      break;
  }

  if (
    data.inputs.some(item => item.error) ||
    data.inputs.some(item => !item.value.length) ||
    data.textareaData.error ||
    !data.textareaData.value.length
  ) {
    emits('validStatus', true);
  } else {
    emits('validStatus', false);
  }
}

function validateForm() {
  // VALIDATING FORM
  data.inputs.forEach(input => validateInput(input.value, input));

  validateInput(data.textareaData.value, data.textareaData);

  // FORM REQUEST
  const date = new Date();

  if (data.inputs.every(input => !input.error) && !data.textareaData.error) {
    const fd = {
      date: date.toLocaleString('ru-RU'),
      email: data.inputs[0].value,
      name: data.inputs[1].value,
      message: data.textareaData.value
    };

    FEEDBACK_POST_REQUEST(fd)
      .then((response) => {
        if (response) {
          data.inputs.forEach(input => input.value = '');
          data.textareaData.value = '';
          emits('activeStatus', false);
          useGlobalStore().responseModal = true;
          useGlobalStore().anyModal = true;
          useGlobalStore().responseSuccess = true;
        } else {
          useGlobalStore().responseModal = true;
          useGlobalStore().anyModal = true;
          useGlobalStore().responseSuccess = false;
        }
      })
  }
}
</script>

<template>
  <form
    class="feedback-form"
    @submit.prevent="validateForm"
  >
    <!--  Email and name inputs  -->
    <template
      v-for="inputData in data.inputs"
      :key="inputData.name"
    >
      <InputBlock
        v-model="inputData.value"
        :input="inputData"
        :error="inputData.error"
        @input="validateInput($event.target.value, inputData)"
      />
    </template>

    <!--  Text area  -->
    <TextareaBlock
      :area="data.textareaData"
      :model-value="data.textareaData.value"
      :start-value="data.textareaData.value"
      :error="data.textareaData.error"
      v-model="data.textareaData.value"
      @input="validateInput($event.target.value, data.textareaData)"
    />

    <!--  Submit button  -->
    <button
      class="feedback-form__submit"
      :class="{'error': formActive && formValid, 'active': formActive && !formValid}"
      type="submit"
      role="button"
      aria-label="submit"
    >
      {{ submitButtonText }}
    </button>
  </form>
</template>

<style lang="scss" scoped>
.feedback-form {
  @apply relative w-full flex flex-col gap-4;

  &__submit {
    @apply p-3 mt-1 border-2 border-[#fff]
    transition-colors bg-none font-semibold
    tracking-wide sm:p-4 sm:mt-4 sm:text-lg
    dark:border-dark;
    transition: box-shadow .2s ease-in-out, transform .2s ease-in-out;

    &:hover {
      transform: translateY(-4px) translateX(-4px);
      @apply shadow-4p dark:shadow-dark;
    }

    &.active {
      @apply bg-green border-green;

      &:hover {
        box-shadow: 4px 4px 0 rgba(19 206 102 / 0.6);
      }
    }

    &.error {
      @apply border-red bg-red;

      &:hover {
        box-shadow: 4px 4px 0 rgba(185, 13, 73, 0.5);
      }
    }
  }
}
</style>
