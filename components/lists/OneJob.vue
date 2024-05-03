<script lang="ts" setup>
// Types
import { Career } from "~/types";

defineProps<{
  job: Career
}>();
</script>

<template>
  <div class="text-sm sm:text-base xl:w-9/12">
    <!--  Job's position  -->
    <h3 class="text-lg sm:text-xl">
      <span class="text-blue">#</span>{{ job.role }} @
    </h3>

    <!--  Company  -->
    <div class="flex gap-2 items-center mt-1 mb-3">
      <!--  Company name  -->
      <nuxt-link
        class="text-blue text-sm sm:text-xl transition-colors hover:text-orange"
        :to="job.link"
        target="_blank"
      >
        {{ job.title }}
      </nuxt-link>

      <!--  Period of work  -->
      <span class="block text-xs sm:text-base">
        | {{ job.from }} - {{ job.to }}
      </span>
    </div>

    <!--  Job's summary  -->
    <p>
      {{ job.summary }}
    </p>

    <!--  Work  -->
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
