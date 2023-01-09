<script lang="ts" setup>
import { computed, useHead } from "#imports";
import { useProjectsStore } from "~/stores/projectsStore";
import { storeToRefs } from "pinia";
import { useHeaderStore } from "~/stores/headerStore";
import PageTitle from "~/components/global/PageTitle.vue";
import ProjectsList from "~/components/lists/ProjectsList.vue";
import ProjectsSkeleton from "~/components/skeletons/ProjectsSkeleton.vue";


const { projects } = storeToRefs(useProjectsStore());
const { currentLang } = storeToRefs(useHeaderStore());
const { PROJECTS_REQUEST } = useProjectsStore();
PROJECTS_REQUEST();

const pageTitleText = computed(() => currentLang.value === 'eng' ? 'PROJECTS' : 'ПРОЕКТЫ')

watch(
  () => currentLang.value,
  () => {
    PROJECTS_REQUEST();
  }
)

useHead({
  title: computed(() => `Maksim Eremeev | Projects`)
})
</script>

<template>
  <div>
    <main>
      <page-title>{{ pageTitleText }}</page-title>
      <ProjectsList
        v-if="projects.length"
        :list="projects"
      />
      <ProjectsSkeleton v-else />
    </main>
  </div>

</template>