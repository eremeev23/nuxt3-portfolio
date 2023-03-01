<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from "pinia";
import { IProject } from "~/types";
import { useHeaderStore } from "~/stores/headerStore";

interface IPops {
  project: IProject
}

const { currentLang } = storeToRefs(useHeaderStore());

const props = defineProps<IPops>();
const domainText = computed(():string => currentLang.value === 'eng' ? 'Project domain:' : 'Сайт проекта:');
const repositoryText = computed(():string => currentLang.value === 'eng' ? 'Project repository:' : 'Репозиторий проекта:');
const stackText = computed(():string => currentLang.value === 'eng' ? 'Project stack:' : 'Стэк проекта:');
const descriptionText = computed(():string => currentLang.value === 'eng' ? 'Description:' : 'Описание:');
const designedByText = computed(():string => currentLang.value === 'eng' ? 'Designed by' : 'Дизайн разработан');
</script>

<template>
  <div class="project-content__info">
    <div class="project-content__info-block info-block">
      <p class="info-block__title">
        {{ domainText }}
      </p>
      <a :href="project.link" target="_blank">
        {{ project.link }}
      </a>
    </div>
    <div class="project-content__info-block info-block">
      <p class="info-block__title">
        {{ repositoryText }}
      </p>
      <a v-if="project.repository" :href="project.repository" target="_blank">
        {{ project.repository }}
      </a>
      <p v-else class="text-red">
        NDA
      </p>
    </div>
    <div class="project-content__info-block info-block info-block_col">
      <p class="info-block__title">
        {{ stackText }}
      </p>
      <div class="flex flex-wrap gap-2">
          <span
              class="tech"
              v-for="(tech, i) in project.stack"
              :key="i"
          >
            {{ tech }}
          </span>
      </div>
    </div>
    <div class="project-content__info-block info-block info-block_col">
      <p class="info-block__title">
        {{ descriptionText }}
      </p>
      <p>
        {{ project.description }}
      </p>
    </div>
    <div class="project-content__info-block info-block ">
      <p class="info-block__title">
        {{ designedByText }} {{ project.designed }}
      </p>
      <nuxt-icon v-if="project.icon" class="ml-1 mt-0.5" :name="project.icon" filled />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-content__info {
  @apply sticky top-[90px] w-full flex flex-col gap-4 text-sm lg:text-base lg:gap-8;
}

.info-block {
  @apply flex flex-wrap gap-2 items-center;

  &_col {
    @apply flex-col items-start;

    .tech {
      @apply block py-0.5 px-3 border-2 border-[#fff] text-[12px]
    }
  }

  a {
    @apply transition-colors underline hover:text-blue;
  }
}
</style>
