<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";

// Stores
import { IMainPage, useMainPageStore } from "~/stores/mainPageStore";
import { useHeaderStore } from "~/stores/headerStore";

// Components
import MainPageSkeleton from "~/components/skeletons/MainPageSkeleton.vue";
import BorderedSpan from "~/components/global/BorderedSpan.vue";
import PagesSecTitle from "~/components/global/PagesSecTitle.vue";
import SkillsList from "~/components/lists/SkillsList.vue";
import OneJob from "~/components/lists/OneJob.vue";

// Stores
const { currentLang } = storeToRefs(useHeaderStore());
const { fetchMainData } = useMainPageStore();

// Layout
const data = ref<IMainPage | null>(await fetchMainData())

watch(
  () => currentLang.value,
  async () => {
    data.value = await fetchMainData();
  }
)
</script>

<template>
  <div>
    <main v-if="data && data.main_text">
      <section class="flex items-center flex-col gap-10 page-section lg:flex-row lg:gap-4">
        <div class="flex-[2]">
          <h1 class="mail-title">
            {{ data.title_text }}
          </h1>
          <p class="page-section__text text-sm lg:text-base" v-html="data.main_text"></p>
        </div>
        <div class="flex-none h-[420px] flex justify-center lg:block lg:flex-1">
          <nuxt-img
            class="max-h-full h-full"
            :src="`/images/${data.photo}`"
            alt="It's me"
            preset="default"
            preload
          />
        </div>
      </section>
      <section v-if="data.skills && data.skills.title" class="page-section">
        <pages-sec-title>{{ data.skills?.title }}</pages-sec-title>
        <SkillsList
          v-if="data.skills?.list?.length"
          :list="data.skills.list"
        />
      </section>
      <section v-if="data.career && data.skills?.title" class="page-section">
        <pages-sec-title>{{ data.career?.title }}</pages-sec-title>
        <div class="flex flex-col gap-8">
          <OneJob
            v-for="job in data.career?.list"
            :key="job.id"
            :job="job"
          />
        </div>
      </section>
      <section v-if="data.facts?.title" class="page-section">
        <pages-sec-title>{{ data.facts?.title }}</pages-sec-title>
        <div class="flex gap-2 flex-wrap sm:gap-4">
          <bordered-span
              v-for="(fact, i) in data.facts?.list"
              :key="i"
          >
            {{ fact }}
          </bordered-span>
        </div>
      </section>
    </main>

    <MainPageSkeleton v-else />
  </div>
</template>

<style lang="scss" scoped>
.mail-title {
  @apply text-2xl mb-3 font-sans text-blue font-semibold tracking-normal lg:text-3xl lg:mb-4;
}
</style>
