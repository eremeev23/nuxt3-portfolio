<script lang="ts" setup>
import { useRoute } from "#app";
import { storeToRefs } from "pinia";
import { useProjectsStore } from "~/stores/projectsStore";
import { useHeaderStore } from "~/stores/headerStore";
import PageTitle from '~/components/global/PageTitle.vue';
import ProjectContent from '~/components/project/ProjectContent.vue';
import {useHead} from "#imports";
import OneProjectSkeleton from "~/components/skeletons/OneProjectSkeleton.vue";

const { slug } = useRoute().params;
const { SET_PROJECT, PROJECTS_REQUEST } = useProjectsStore();
const { project } = storeToRefs(useProjectsStore());
const { currentLang } = storeToRefs(useHeaderStore());

SET_PROJECT(slug);

if (project.value) {
  useHead({
    title: computed(() => `Maksim Eremeev | ${project?.value.title}`)
  })
} else {
  PROJECTS_REQUEST()
    .then(() => SET_PROJECT(slug))
      .then(() => {
        useHead({
          title: computed(() => `Maksim Eremeev | ${project?.value.title}`)
        })
      })
}

watch(
  () => currentLang.value,
  () => {
    PROJECTS_REQUEST()
      .then(() => SET_PROJECT(slug))
  }
)

const pageTitleText = computed(() => project.value.title.replaceAll(' ', '-'));
const backButtonText = computed(():string => currentLang.value === 'eng' ? 'back to all projects' : 'назад ко всем проектам');

</script>

<template>
  <main class="project">
    <nuxt-link to="/projects" class="block w-fit mb-4 transition-colors text-sm sm:text-base sm:mb-6 hover:text-blue">
      &lt;- {{ backButtonText }}
    </nuxt-link>
    <div v-if="project">
      <page-title>
        {{ pageTitleText }}
      </page-title>
      <ProjectContent :project="project"/>
    </div>
    <OneProjectSkeleton v-else />
  </main>
</template>

<style lang="scss" scoped>
.project {
  &__title {
    @apply text-4xl font-bold mb-16
  }
}
</style>
