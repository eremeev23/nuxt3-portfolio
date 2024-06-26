<script lang="ts" setup>
// Types
import { Project } from "~/types";

defineProps<{
  list: Project[];
}>();
</script>

<template>
  <ul class="grid grid-cols-custom-5 gap-6">
    <li
      v-for="project in list"
      :key="project.slug"
      class="list-item bg-dark "
    >
      <nuxt-link class="flex flex-col border-2 border-white items-end" :to="`/projects/${project.slug}`">
        <!-- Project's main image -->
        <div class="relative border-white w-full flex-2 h-[240px]">
          <nuxt-img
            class="object-cover max-h-full h-full w-full object-top"
            :src="`/images/${project.image}`"
            :alt="project.title"
            preset="default"
            preload
          />
        </div>

        <!-- Project's tech stack -->
        <div class="w-full py-2 px-3 border-y-2 flex flex-wrap gap-2 sm:h-[68px]">
          <span
            class="text-sm"
            v-for="(tech, i) in project.stack"
            :key="i"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Project's name and description -->
        <div class="p-3 w-full flex flex-3 flex-col gap-2 sm:p-4">
          <h3 class="flex gap-2 justify-between items-start text-lg">
            {{ project.title }}

            <nuxt-icon v-if="project.icon" class="mt-1" :name="project.icon" filled />
          </h3>

          <p class="opacity-[.6] text-sm">
            {{ project.caption }}
          </p>
        </div>

        <span class="block mr-3 my-4 px-3 py-1.5 shadow-2p border-[1px] border-[#fff] text-sm sm:hidden">
          more ->
        </span>
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

.dark .list-item:hover {
  a {
    border-color: #282C33;
  }

  &::before {
    bottom: -8px;
    right: -8px;
    background-color: #282C33;
  }
}
</style>
