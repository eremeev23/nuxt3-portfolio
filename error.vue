<script lang="ts" setup>
import {storeToRefs} from "pinia";
import {useHeaderStore} from "~/stores/headerStore";
import TheHeader from "~/components/base/TheHeader.vue";
import TheFooter from "~/components/base/TheFooter.vue";
import TheSidebar from "~/components/base/TheSidebar.vue";
import TheMobileMenu from "~/components/base/TheMobileMenu.vue";

const { currentLang } = storeToRefs(useHeaderStore());

const props = defineProps({
  error: Object
})

const warningTextOther = computed(():string => currentLang.value === 'eng' ? 'Something goes wrong :(' : 'Что-то пошло не так :(');
const warningText404 = computed(():string => currentLang.value === 'eng' ? 'Oops... This page doesn\'t exist :(' : 'Упс... Такой страницы нет :(');
const linkText404 = computed(():string => currentLang.value === 'eng' ? 'go to home page ->' : 'на главную ->');
</script>

<template>
  <TheHeader />
  <TheMobileMenu />
  <TheSidebar />
  <main class="error-layout">
    <div class="error-wrapper" v-if="error.statusCode === '404'">
      <p>
        {{ warningText404 }}
      </p>
      <nuxt-link to="/">
        {{ linkText404 }}
      </nuxt-link>
    </div>
    <div class="error-wrapper" v-else>
      <p>
        {{ warningTextOther }} Error: {{ error.statusCode }}
      </p>
      <nuxt-link to="/">
        {{ linkText404 }}
      </nuxt-link>
    </div>
  </main>
  <TheFooter />
</template>

<style lang="scss" scoped>
.error-layout {
  @apply h-[80vh] w-full flex items-center justify-center;

  .error-wrapper {
    @apply flex flex-col gap-12 items-center;
    max-width: calc(100% - 40px);

    p {
      @apply text-red text-4xl text-center font-semibold;
    }

    a {
      @apply block py-3 px-4 border-2 border-[#fff] text-lg transition-colors hover:text-dark hover:bg-white;
      box-shadow: 4px 4px 0 #ccc;
      transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;

      &:hover {
        transform: translateX(4px) translateY(4px);
        box-shadow: 0 0 0 #ccc;
      }
    }
  }
}
</style>