<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

// Stores
import { useGlobalStore } from "~/stores/globalStore";

// Components
import TheHeader from "~/components/base/TheHeader.vue";
import TheFooter from "~/components/base/TheFooter.vue";
import TheSidebar from "~/components/base/TheSidebar.vue";
import TheMobileMenu from "~/components/base/TheMobileMenu.vue";
import FeedbackFormResponse from "~/components/forms/FeedbackFormResponse.vue";

// Store
const appStore = useGlobalStore();

// Function
function toggleModals() {
  appStore.anyModal ? appStore.TOGGLE_MODAL('close') : appStore.TOGGLE_MODAL();
}
</script>

<template>
  <div id="nuxt">
    <TheHeader />

    <TheMobileMenu />

    <TheSidebar />

    <NuxtPage class="custom-container mx-auto" />

    <div @click="toggleModals" :class="appStore.anyModal ? 'modals opened' : 'modals'">
      <FeedbackFormResponse />
    </div>

    <TheFooter />

    <SpeedInsights />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 1s ease-in-out;
}

.page-enter-from {
  transform: translateY(90%) scale(.9);
  opacity: 0;
}

.page-leave-to {
  transform: translateY(-50%) scale(.9);
  opacity: 0;
}
</style>
