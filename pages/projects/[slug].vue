<script lang="ts" setup>
import { watch, computed } from "vue";
import { useRoute, useHead } from "#app";
import { storeToRefs } from "pinia";

// Stores
import { useProjectsStore } from "~/stores/projectsStore";
import { useHeaderStore } from "~/stores/headerStore";

// Components
import PageTitle from '~/components/global/PageTitle.vue';
import ProjectContent from '~/components/project/ProjectContent.vue';
import OneProjectSkeleton from "~/components/skeletons/OneProjectSkeleton.vue";

// Utils
const { slug } = useRoute().params;

// Stores
const { SET_PROJECT, PROJECTS_REQUEST } = useProjectsStore();
const { project } = storeToRefs(useProjectsStore());
const { currentLang } = storeToRefs(useHeaderStore());

// Data fetching
SET_PROJECT(slug);

// Page title
if (project.value !== null) {
  useHead({
    title: computed(() => `Maksim Eremeev | ${project.value?.title}`)
  })
} else {
  PROJECTS_REQUEST('eng')
    .then(() => SET_PROJECT(slug))
    .then(() => {
      useHead({
        title: computed(() => `Maksim Eremeev | ${project.value?.title}`)
      })
    })
}

// Layout
watch(
  currentLang,
  () => {
    PROJECTS_REQUEST()
      .then(() => SET_PROJECT(slug))
  }
)

const pageTitleText = computed(() => project.value?.title.replaceAll(' ', '-'));
const backButtonText = computed(() => currentLang.value === 'eng' ? 'back to all projects' : 'назад ко всем проектам');
</script>

<template>
  <main class="project">
    <!--  Back button  -->
    <nuxt-link to="/projects" class="block w-fit mb-4 transition-colors text-sm sm:text-base sm:mb-6 hover:text-blue">
      &lt;- {{ backButtonText }}
    </nuxt-link>

    <!--  Main data  -->
    <div v-if="project">
      <page-title>
        {{ pageTitleText }}
      </page-title>
      <ProjectContent :project="project"/>
    </div>

    <!--  Skeleton  -->
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
