<script lang="ts" setup>
import { useGlobalStore } from "~/stores/globalStore";
import { storeToRefs } from "pinia";
import { useHeaderStore } from "~/stores/headerStore";

const { responseSuccess } = storeToRefs(useGlobalStore());
const { currentLang } = storeToRefs(useHeaderStore());

const responseText = computed(():string =>  currentLang.value === 'eng' ? 'Message is sent' : 'Сообщение отправлено');
const errorText = computed(():string =>  currentLang.value === 'eng' ? 'Message isn`t sent. Something goes wrong.' : 'Сообщение не отправлено. Что-то пошло не так.');
</script>

<template>
  <Teleport to="body">
    <div
        v-if="useGlobalStore().responseModal"
        class="modal signup-modal"
    >
      <button
        @click="useGlobalStore().TOGGLE_RESPONSE_MODAL"
        class="close"
        type="button"
        role="button"
        aria-label="close"
      >
        <nuxt-icon name="close-icon" />
      </button>
      <p v-if="responseSuccess" class="bg-[#fff] text-center text-dark text-lg">
        {{ responseText }}
      </p>
      <p v-else class="bg-[#fff] text-center text-dark text-lg">
        {{ errorText }}
      </p>
    </div>
  </Teleport>
</template>