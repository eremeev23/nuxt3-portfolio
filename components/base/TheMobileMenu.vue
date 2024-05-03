<script lang="ts" setup>
import { storeToRefs } from "pinia";

// Stores
import { useHeaderStore } from "~/stores/headerStore";

const { menuStatus, navigation } = storeToRefs(useHeaderStore());

// Functions
function navigate() {
  useHeaderStore().$patch((state) => state.menuStatus = !state.menuStatus);
}
</script>

<template>
  <nav :class="menuStatus ? 'mobile-nav opened' : 'mobile-nav'">
    <ul class="mobile-nav__list">
      <li
        class="mobile-nav__list-item"
        v-for="item in navigation"
        :key="item.id"
      >
        <nuxt-link
          @click="navigate"
          class='header-link'
          :to="item.href"
          :title="item.text"
        >
          <span class="text-blue">#</span><span>{{ item.text }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-nav {
  @apply fixed flex pt-[140px] overflow-hidden justify-center right-[-100%] top-[64px] w-screen bg-dark dark:bg-light z-[100] sm:hidden;
  height: calc(100vh - 64px);
  transition: right .6s ease-in-out;

  &.opened {
    right: 0;
  }

  &__list {
    @apply flex flex-col gap-12 overflow-hidden;

    &-item {
      .header-link {
        @apply text-4xl
      }
    }
  }
}
</style>
