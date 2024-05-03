<script lang="ts" setup>
import { storeToRefs } from "pinia";

// Stores
import { useGlobalStore } from "~/stores/globalStore";
import { useHeaderStore } from "~/stores/headerStore";

const { responseSuccess } = storeToRefs(useGlobalStore());
const { currentLang } = storeToRefs(useHeaderStore());

// Layout
const responseText = computed<string>(
  () =>  currentLang.value === 'eng' ?
    'Thank you, your message is sent' :
    'Спасибо, ваше сообщение отправлено'
)

const errorText = computed<string>(
  () =>  currentLang.value === 'eng' ?
    'Message isn`t sent. Something goes wrong.' :
    'Сообщение не отправлено. Что-то пошло не так.'
)
</script>

<template>
  <Teleport to="body">
    <div
        v-if="useGlobalStore().responseModal"
        class="modal signup-modal"
    >
      <!--  Close button  -->
      <button
        @click="useGlobalStore().TOGGLE_RESPONSE_MODAL"
        class="close"
        type="button"
        role="button"
        aria-label="close"
      >
        <nuxt-icon name="close-icon" />
      </button>

      <!--  Response text  -->
      <p v-if="responseSuccess" class="bg-[#fff] text-center text-dark text-lg">
        {{ responseText }}
      </p>

      <p v-else class="bg-[#fff] text-center text-dark text-lg">
        {{ errorText }}
      </p>
    </div>
  </Teleport>
</template>
