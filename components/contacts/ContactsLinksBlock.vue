<script lang="ts" setup>
import { IContacts } from "~/stores/contactsStore";

interface IProps {
  contactsInfo: IContacts[]
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="links-list">
    <div class="inner">
      <a
        class="links-list__item"
        v-for="item in contactsInfo"
        :key="item.href"
        :href="`${item.hrefPref}${item.href}`"
        target="_blank"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inner {
  @apply w-full h-fit grid grid-cols-3 gap-4;
  grid-template-columns: repeat(auto-fill, minmax(126px, 1fr));
}

.links-list {
  &__item {
    @apply p-2 h-fit border-2 border-[#fff] text-center transition-colors hover:border-blue hover:bg-blue;
  }
}
</style>