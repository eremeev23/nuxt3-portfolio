<script lang="ts" setup>
import { watch, computed, ref, reactive }  from "vue";
import { useHead } from "#app";
import { storeToRefs } from "pinia";

// Stores
import { useHeaderStore } from "~/stores/headerStore";
import { useContactsStore } from "~/stores/contactsStore";

// Components
import FeedbackForm from '~/components/forms/FeedbackForm.vue';
import ContactsLinksBlock from '~/components/contacts/ContactsLinksBlock.vue';

// Stores
const { contactsInfo } = storeToRefs(useContactsStore());
const { currentLang } = storeToRefs(useHeaderStore());

const { CONTACTS_REQUEST } = useContactsStore();

// Data fetching
CONTACTS_REQUEST();

// Layout
const pageTitleText = computed(() => currentLang.value === 'eng' ? 'CONTACTS' : 'КОНТАКТЫ');
const formTitle = computed(() => {
  if (currentLang.value === 'eng') {
    return showForm.value ? 'CONTACT ME' : 'LINKS'
  } else {
    return showForm.value ? 'СВЯЗАТЬСЯ СО МНОЙ' : 'ССЫЛКИ'
  }
})
const buttonText = computed(() => {
  if (currentLang.value === 'eng') {
    return showForm.value ? 'OTHER WAYS' : 'BACK TO FORM'
  } else {
    return showForm.value ? 'ДРУГИЕ СПОСОБЫ' : 'ОБРАТНО К ФОРМЕ'
  }
})

const showForm = ref(true);

const data = reactive({
  formValid: true,
  formActive: false
})

const hiderHandler = (val:boolean) => {
  showForm.value = val;
}

watch(
  () => currentLang.value,
  () => {
    CONTACTS_REQUEST();
  }
)

// Page title
useHead({
  title: computed(() => `Maksim Eremeev | Contacts`)
})
</script>

<template>
  <main>
    <page-title>
      {{ pageTitleText }}
    </page-title>

    <div class="flex justify-center">
      <div
        class="contacts-wrapper"
        :class="{'error': data.formActive && data.formValid && showForm, 'active': data.formActive && !data.formValid && showForm}"
      >
        <div class="contacts-wrapper__header">
          <h3>
            {{ formTitle }}
          </h3>

          <button role="button" aria-label="switch tabs" @click="showForm = !showForm">
            {{ buttonText }}
          </button>
        </div>
        <FeedbackForm
          :form-active="data.formActive"
          :form-valid="data.formValid"
          @active-status="data.formActive = $event"
          @valid-status="data.formValid = $event"
        />
        <ContactsLinksBlock
          class="contacts-wrapper__links"
          :class="{'visible': !showForm}"
          @hide="hiderHandler($event)"
          :contacts-info="contactsInfo"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.contacts-wrapper {
  @apply max-w-md w-full relative p-3 shadow-4p sm:shadow-8p border-2 border-[#fff] dark:border-dark dark:shadow-dark overflow-hidden sm:p-4;

  &.active {
    @apply border-green;
    box-shadow: 8px 8px 15px rgba(19 206 102 / 0.3);

    @media screen and (max-width: 640px) {
      box-shadow: 4px 4px 0 rgba(19 206 102 / 0.3);
    }
  }

  &.error {
    @apply border-red shadow-red;
    box-shadow: 8px 8px 15px rgba(255 17 100 / .3);

    @media screen and (max-width: 640px) {
      box-shadow: 4px 4px 0 rgba(255 17 100 / .3);
    }
  }

  &__header {
    @apply flex justify-between items-start;

    h3 {
      @apply text-base font-medium mb-3 sm:text-xl sm:mb-4;
    }

    button {
      @apply py-1 underline text-sm transition-colors text-[12px] sm:text-base hover:text-blue;
    }
  }

  &__links {
    @apply absolute top-[40px] w-full left-0 p-4;
    height: calc(100% - 40px);
    transform: translateY(110%);
    transition: transform .6s ease-in-out;

    &.visible {
      transform: translateY(0);
    }
  }
}
</style>
