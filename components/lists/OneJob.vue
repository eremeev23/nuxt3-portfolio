<script lang="ts" setup>
import { defineProps } from "vue";
import { ICareer } from "~/types";

interface IProps {
  job: ICareer
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="text-sm sm:text-base">
    <h3 class="text-lg sm:text-xl">
      <span class="text-blue">#</span>{{ job.role }} @
    </h3>
    <div class="flex gap-2 items-center mt-1 mb-3">
      <nuxt-link
        class="text-blue text-sm sm:text-xl transition-colors hover:text-orange"
        :to="job.link"
        target="_blank"
      >
        {{ job.title }}
      </nuxt-link>
      <span class="block text-xs sm:text-base">
        | {{ job.from }} - {{ job.to }}
      </span>
    </div>
    <p class="max-w-[640px]">
      {{ job.summary }}
    </p>
    <ul
      class="mt-3 list-square list-inside"
      v-if="job.list"
    >
      <li
        v-for="(item, i) in job.list"
        :key="i"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {

}
</style>
