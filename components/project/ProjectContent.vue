<script lang="ts" setup>
import { Project } from "~/types";

// Components
import ProjectContentInfo from "~/components/project/ProjectContentInfo.vue";

defineProps<{
  project: Project
}>();

// Layout
const data = reactive({
  modules: [SwiperPagination],
  pagination: {
    el: '.project-content__swiper-progress',
    type: 'progressbar'
  }
})

// Functions
function goToSlide(i:number) {
  const block: HTMLElement | null = document.querySelector('.project-content__scrollable');

  window.scrollTo({
    // @ts-ignore
    top: block?.children[i]?.offsetTop - 94,
    left: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="project-content">
    <!--  Mobile swiper  -->
    <section class="project-content__swiper" v-if="project?.slides">
      <client-only>
        <Swiper
          :modules="data.modules"
          :spaceBetween="10"
          :pagination="data.pagination"
        >
          <swiper-slide
            v-for="(image, i) in project.slides"
            :key="i"
          >
            <nuxt-img
              preset="default"
              :src="`/images/${image}`"
              :alt="`screenshot ${i + 1}`"
            />
          </swiper-slide>
        </Swiper>
      </client-only>
      <div class="project-content__swiper-progress"></div>
    </section>

    <!--  Project info  -->
    <section class="w-full max-w-6/12 xl:max-w-[33%] lg:max-w-[40%]">
      <ProjectContentInfo :project="project" />
    </section>

    <!--  Desktop swiper  -->
    <section class="project-content__scrollable">
      <div
        v-for="(image, i) in project.slides"
        :key="i"
        class="image-wrapper"
      >
        <nuxt-img
          preset="default"
          :src="`/images/${image}`"
          :alt="`screenshot ${i + 1}`"
        />
      </div>
    </section>

    <!--  Desktop swiper's navigation  -->
    <section class="project-content__sticky">
      <div class="flex flex-col gap-2 sticky top-[92px]">
        <div
          v-for="(image, i) in project.slides"
          :key="i"
          class="image-wrapper"
          @click="goToSlide(i)"
        >
          <nuxt-img
            preset="default"
            :src="`/images/${image}`"
            :alt="`screenshot ${i + 1}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.project-content {
  @apply flex flex-col gap-[20px] sm:flex-row;

  &__swiper {
    @apply relative max-w-full mb-8 sm:hidden;

    .swiper-slide {
      @apply h-[380px];

      img {
        @apply max-h-full h-full w-full object-cover object-top;
      }
    }

    &-progress {
      @apply top-auto bottom-[-15px];
    }
  }

  &__scrollable {
    @apply hidden flex-col gap-8 w-full sm:flex;

    .image-wrapper {
      @apply h-auto max-h-[700px] w-full border-2 border-[#fff];

      img {
        @apply max-h-full h-auto w-full max-w-full object-cover object-top;
      }
    }
  }

  &__sticky {
    @apply hidden lg:block;

    .image-wrapper {
      @apply cursor-pointer h-[100px] w-[90px] border-2 border-[#fff] p-1 transition-colors hover:border-blue;

      img {
        @apply max-h-full h-full w-full max-w-full object-cover object-top;
      }
    }
  }
}
</style>
