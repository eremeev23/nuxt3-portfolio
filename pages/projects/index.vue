<script lang="ts" setup>
import { watch, computed } from "vue";
import { useHead } from "#app";
import { storeToRefs } from "pinia";

// Stores
import { useProjectsStore } from "~/stores/projectsStore";
import { useHeaderStore } from "~/stores/headerStore";

// Components
import PageTitle from "~/components/global/PageTitle.vue";
import ProjectsList from "~/components/lists/ProjectsList.vue";
import ProjectsSkeleton from "~/components/skeletons/ProjectsSkeleton.vue";

// Stores
const { projects } = storeToRefs(useProjectsStore());
const { currentLang } = storeToRefs(useHeaderStore());
const { PROJECTS_REQUEST } = useProjectsStore();

// Data fetching
PROJECTS_REQUEST();

// Layout
const pageTitleText = computed(() => currentLang.value === 'eng' ? 'PROJECTS' : 'ПРОЕКТЫ')

watch(
  () => currentLang.value,
  () => {
    PROJECTS_REQUEST();
  }
)

// Page title
useHead({
  title: computed(() => `Maksim Eremeev | Projects`)
})
</script>

<template>
  <div>
    <main>
      <!--  Page title  -->
      <page-title>{{ pageTitleText }}</page-title>

      <!--  Projects  -->
      <ProjectsList
        v-if="projects.length"
        :list="projects"
      />
      <!--  Skeleton  -->
      <ProjectsSkeleton v-else />
    </main>
  </div>

</template>
