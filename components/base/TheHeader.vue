<script setup lang="ts">
import { useLazyAsyncData } from "#app";
import { storeToRefs } from "pinia";
import { Lang, useHeaderStore } from "~/stores/headerStore";

const { menuStatus } = storeToRefs(useHeaderStore());
const { HEADER_REQUEST, CHANGE_LANG } = useHeaderStore();

const { data } = useLazyAsyncData(() => HEADER_REQUEST());

const onSelect = (value:Lang) => {
  CHANGE_LANG(value);
  HEADER_REQUEST();
}

const menuHandler = () => {
  useHeaderStore().$patch((state) => state.menuStatus = !state.menuStatus);
}

const theme = ref(false);
const themeIcon = ref<string>('light-mode');
const switchTheme = () => {
  const body = document.querySelector('body');
  body?.classList.toggle('dark');
  theme.value = !theme.value;

  if (theme.value) {
    themeIcon.value = 'dark-mode';
  } else {
    themeIcon.value = 'light-mode';
  }
}
</script>

<template>
  <header class="py-4 z-[2] sticky top-0 custom-container mx-auto sm:py-6 lg:py-8">
    <nav class="flex items-center justify-between">
      <nuxt-link class="text-xl transition-colors hover:text-blue" to="/">
        EREME{D}EV
      </nuxt-link>

      <ul v-if="data?.navigation?.length" class="flex items-center gap-4 sm:gap-8">
        <li
          class="hidden sm:block"
          v-for="item in data.navigation"
          :key="item.id"
        >
          <nuxt-link
            class='header-link'
            :to="item.href"
            :title="item.text"
          >
            <span class="text-blue">#</span><span>{{ item.text }}</span>
          </nuxt-link>
        </li>
        <li v-if="data.langs">
          <select
            @change="onSelect($event.target.value)"
            name="lang"
            id="lang"
            class="text-[14px] sm:text-base"
          >
            <option
              v-for="(lang, k) in data.langs"
              :key="k"
              :value="lang"
            >
              {{ lang }}
            </option>
          </select>
        </li>
        <li class="flex items-end">
          <button @click="switchTheme">
            <nuxt-icon v-if="theme" name="dark-mode" />
            <nuxt-icon v-else name="light-mode" />
          </button>
        </li>
        <li class="sm:hidden">
          <button
            @click="menuHandler"
            :class="menuStatus ? 'burger-button opened' : 'burger-button'"
            role="button"
            aria-label="menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.burger-button {
  @apply flex py-2 pl-2 flex-col gap-[5px];
  transition: transform .3s ease-in-out .6s;

  span {
    @apply block w-[24px] h-[2px] bg-white dark:bg-dark rounded-[999px];
    transition: transform .3s ease-in-out, width .3s ease-in-out, background-color .9s ease-in-out;

    &:first-child, &:last-child {
      transition-delay: .3s;
    }
  }

  &.opened {
    transform: rotate(45deg) translateY(-10%);

    span {
      @apply bg-blue;

      &:nth-child(2) {
        width: 0;
      }

      &:first-child {
        transform: rotate(90deg) translateX(25%);
      }

      &:last-child {
        transform: translateY(-8px);
      }
    }
  }
}
</style>
