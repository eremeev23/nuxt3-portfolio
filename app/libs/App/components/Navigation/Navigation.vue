<script setup lang="ts">
const pages = useNavPages()
</script>

<template>
  <ul class="flex m-0 p-0 list-none">
    <li
      v-for="page in pages"
      :key="page.path"
      class="flex"
    >
      <NuxtLinkLocale
        :to="page.path"
        class="nav-cell"
        :class="{ 'nav-cell--active': page.active }"
        :aria-current="page.active ? 'page' : undefined"
      >
        {{ page.name }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.nav-cell--active {
  color: var(--fg);

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 5px;
    background: var(--accent);
  }
}
</style>
