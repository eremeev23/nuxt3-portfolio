<script setup lang="ts">
import {useHeaderStore} from "~/stores/headerStore";
import {storeToRefs} from "pinia";

const { icons } = storeToRefs(useHeaderStore());
</script>

<template>
  <div class="sidebar-wrapper fixed left-0 top-0 h-full z-[1] px-6 bg-transparent items-center justify-center">
    <div class="flex flex-col gap-4">
      <a
        class="flex justify-center items-center p-[8px] rounded-[50%] border-2"
        v-for="item in icons"
        :key="item.icon"
        :href="item.href"
        target="_blank"
        :title="item.name"
      >
        <nuxt-icon :name="item.icon" :filled="false" />
        <span style="display: none">{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
a {
  color: inherit;
  transition: border-color .2s ease-in-out;

  .nuxt-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    svg {
      width: 20px;
      height: 20px;
      fill: none;

      path {
        transition: color .2s ease-in-out;
      }
    }
  }

  &:hover {
    border-color: #1fb6ff;

    .nuxt-icon path {
      color: #1fb6ff;
    }
  }
}

.sidebar-wrapper {
  display: none;

  @media screen and (min-width: 920px) {
    display: flex;
  }
}
</style>