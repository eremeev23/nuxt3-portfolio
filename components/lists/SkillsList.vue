<script setup lang="ts">
import { Skill } from "~/types";

defineProps<{
  list: Skill[];
}>()
</script>

<template>
  <div class="grid grid-cols-custom gap-4">
    <div
      class="flex-1"
      v-for="skill in list"
      :key="skill.title"
    >
      <!--  Skill type title  -->
      <h3 class="p-3 border-2 border-white text-lg">
        {{ skill.title }}
      </h3>

      <!--  Skill name  -->
      <ul class="border-2 border-white border-t-0 p-4 flex flex-col gap-2">
        <li
          v-for="(item, i) in skill.list"
          :key="i"
          class="opacity-[.7] text-sm"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
