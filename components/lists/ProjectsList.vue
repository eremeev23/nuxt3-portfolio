<script lang="ts" setup>
import { IProject } from "~/types";

interface IProps {
  list: IProject[];
}

const props = defineProps<IProps>();
</script>

<template>
  <ul class="grid grid-cols-custom-5 gap-6">
    <li
      v-for="project in list"
      :key="project.slug"
      class="list-item bg-dark "
    >
      <nuxt-link class="flex flex-col border-2 border-white" :to="`/projects/${project.slug}`">
        <div class="border-white flex-2 h-[240px]">
          <nuxt-img
            class="object-cover max-h-full h-full w-full object-top"
            :src="`/images/${project.image}`"
            :alt="project.title"
            preset="default"
            preload
          />
        </div>
        <div class="py-2 px-3 border-y-2 flex flex-wrap gap-2 sm:h-[68px] sm:p-4">
          <span
            class="text-sm"
            v-for="(tech, i) in project.stack"
            :key="i"
          >
            {{ tech }}
          </span>
        </div>
        <div class="p-3 flex flex-3 flex-col gap-2 sm:p-4">
          <h3 class="text-lg">
            {{ project.title }}
          </h3>
          <p class="opacity-[.6] text-sm">
            {{ project.caption }}
          </p>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list-item {
  position: relative;
  transition: transform .3s ease-in-out;

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: -2;
    transition: bottom .3s ease, right .3s ease-in-out;
  }

  a {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  &:hover {
    transform: translateY(-8px) translateX(-8px);

    a {
      border-color: #fff;
    }

    &::before {
      bottom: -8px;
      right: -8px;
      background-color: #ccc;
    }
  }
}
</style>