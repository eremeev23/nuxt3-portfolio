<script setup lang="ts">
// Utils
const { t, locales, locale, setLocale } = useI18n()

// Layout
const options = computed(() => locales.value.map(item => ({
  value: item.code,
  label: item.name ?? item.code,
})))

const currentName = computed(() => t(`locales.${locale.value}`))

// Functions
function handleChangeLocale(code: typeof locale.value) {
  if (code !== locale.value) {
    setLocale(code)
  }
}
</script>

<template>
  <Selector
    class="locale-selector"
    :model-value="locale"
    :options
    trigger-class="nav-cell"
    align="right"
    @update:model-value="handleChangeLocale"
  >
    <template #trigger>
      <PixelFlag :code="locale" />
      <span class="sr-only">{{ $t('a11y.language') }}: {{ currentName }}</span>
    </template>

    <template #option="{ option }">
      <PixelFlag :code="option.value" />
      <span class="normal-case">{{ option.label }}</span>
    </template>
  </Selector>
</template>
