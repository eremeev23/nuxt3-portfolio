<script setup lang="ts">
import { useMainPageStore } from "~/stores/mainPageStore";
import { storeToRefs } from "pinia";
import SkillsList from "~/components/lists/SkillsList.vue";
import BorderedSpan from "~/components/global/BorderedSpan.vue";
import PagesSecTitle from "~/components/global/PagesSecTitle.vue";
import MainPageSkeleton from "~/components/skeletons/MainPageSkeleton.vue";
import {useHeaderStore} from "~/stores/headerStore";

const { mainPage } = storeToRefs(useMainPageStore());
const { currentLang } = storeToRefs(useHeaderStore());
const { MAIN_PAGE_REQUEST } = useMainPageStore();
MAIN_PAGE_REQUEST();

watch(
  () => currentLang.value,
  () => {
    MAIN_PAGE_REQUEST();
  }
)
</script>

<template>
  <div>
    <main v-if="mainPage.main_text">
      <section class="flex items-center flex-col gap-10 page-section lg:flex-row lg:gap-4">
        <div class="flex-[2]">
          <h1 class="mail-title">
            {{ mainPage.title_text }}
          </h1>
          <p class="page-section__text text-sm lg:text-base" v-html="mainPage.main_text"></p>
        </div>
        <div class="hidden flex-none h-[420px] flex justify-center lg:block lg:flex-1">
          <nuxt-img
            class="max-h-full h-full"
            :src="`/images/${mainPage.photo}`"
            alt="It's me"
            preset="default"
            preload
          />
        </div>
      </section>
      <section v-if="mainPage.skills && mainPage.skills.title" class="page-section">
        <pages-sec-title>{{mainPage.skills.title}}</pages-sec-title>
        <SkillsList
          :list="mainPage.skills.list"
        />
      </section>
      <section v-if="mainPage.facts && mainPage.facts.title" class="page-section">
        <pages-sec-title>{{ mainPage.facts.title }}</pages-sec-title>
        <div class="flex gap-2 flex-wrap sm:gap-4">
          <bordered-span
              v-for="(fact, i) in mainPage.facts.list"
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

.page-section {

}
</style>