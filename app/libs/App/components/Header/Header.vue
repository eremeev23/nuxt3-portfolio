<script setup lang="ts">
// Utils
const route = useRoute()

// Layout
const menuId = 'mobile-menu'
const isMenuOpen = ref(false)
const header = ref<HTMLElement | null>(null)
const burgerButton = ref<{ el: HTMLButtonElement | null } | null>(null)
const burger = computed(() => burgerButton.value?.el ?? null)

// Functions
function closeMenu() {
  if (!isMenuOpen.value) {
    return
  }

  isMenuOpen.value = false
  nextTick(() => burger.value?.focus())
}

let resizeObserver: ResizeObserver | undefined

function syncHeaderHeight() {
  const height = header.value?.getBoundingClientRect().height ?? 0
  document.documentElement.style.setProperty('--header-h', `${height}px`)
}

// Watchers
watch(() => route.fullPath, closeMenu)

watch(isMenuOpen, isOpen => {
  if (isOpen) {
    syncHeaderHeight()
  }
})

// Lifecycles
onMounted(() => {
  syncHeaderHeight()
  resizeObserver = new ResizeObserver(syncHeaderHeight)

  if (header.value) {
    resizeObserver.observe(header.value)
  }
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <header
    ref="header"
    class="header"
  >
    <NuxtLinkLocale
      to="/"
      class="header__logo"
      :aria-label="$t('a11y.home')"
    >
      <AppLogo />
    </NuxtLinkLocale>

    <nav
      class="flex"
      :aria-label="$t('a11y.sections')"
    >
      <Navigation class="header__pages" />

      <LocaleSelector />

      <ThemeToggle />

      <BurgerButton
        ref="burgerButton"
        v-model="isMenuOpen"
        class="header__burger"
        :controls="menuId"
      />

      <NuxtLinkLocale
        to="/contacts"
        class="nav-hire"
      >
        {{ $t('nav.hire') }}
      </NuxtLinkLocale>
    </nav>

    <MobileMenu
      :id="menuId"
      :open="isMenuOpen"
      :toggle="burger"
      @close="closeMenu"
    />
  </header>
</template>

<style scoped lang="scss">
$nav-collapse: 980px;
$phone: 520px;

.header {
  @apply sticky top-0 z-20 flex items-stretch justify-between bg-bg b-0 bw-b b-solid b-line;
  @apply font-mono font-800 text-[12px] tracking-[.06em] uppercase;

  &__logo {
    @apply flex items-center px-7 no-underline;
  }

  &__burger {
    width: var(--bar);
    display: none;
  }

  @media (max-width: $nav-collapse) {
    --bar: 50px;
    height: calc(var(--bar) + var(--b));

    :deep(.theme-toggle),
    :deep(.locale-selector .selector__trigger) {
      width: var(--bar);
    }

    :deep(.locale-selector .selector__trigger) {
      @apply justify-center px-0 py-0;
    }

    :deep(.locale-selector .selector__arrow) {
      display: none;
    }

    &__logo {
      @apply px-4;
    }

    &__pages {
      display: none;
    }

    &__burger {
      display: flex;
    }
  }

  @media (max-width: $phone) {
    --bar: 46px;
    @apply text-[11px];

    .nav-hire {
      display: none;
    }

    &__logo {
      @apply py-3;

      > span {
        font-size: 16px;
      }
    }

    :deep(.nav-cell:not(.theme-toggle, .header__burger, .selector__trigger)) {
      @apply px-4 py-3.5;
    }
  }
}
</style>
