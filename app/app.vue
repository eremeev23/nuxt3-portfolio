<script setup lang="ts">
const { t } = useI18n()

// lang/dir on <html>, plus hreflang alternates, canonical and og:locale.
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
  link: [...(i18nHead.value.link ?? [])],
  meta: [...(i18nHead.value.meta ?? [])],
  titleTemplate: title =>
    title ? `${title} | ${t('meta.siteName')}` : t('meta.siteName'),
}))

useSeoMeta({
  description: () => t('meta.description'),
  ogTitle: () => t('meta.siteName'),
  ogDescription: () => t('meta.description'),
  ogSiteName: () => t('meta.siteName'),
})
</script>

<template>
  <NuxtPage />
</template>
