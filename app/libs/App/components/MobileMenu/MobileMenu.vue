<script setup lang="ts">
/*
 * Full-screen menu under the header (≤980px). A modal dialog whose toggle is
 * the header's burger, which stays visible above it: Tab cycles through the
 * burger and the menu, Esc and the burger close it, the page behind does not
 * scroll. The header owns `open` and returns focus to the burger.
 */
const props = defineProps<{
  open: boolean
  id?: string
  /** The header's burger: part of the focus cycle while the menu is open. */
  toggle?: HTMLElement | null
}>()

const emit = defineEmits<{
  close: []
}>()

// Utils
const { t, locale } = useI18n()
const pages = useNavPages()

// Client-only and lazy: the menu only ever opens in the browser, so SSR does not pay for it.
const { data: contacts } = useFetch('/api/contacts', {
  query: { locale },
  default: () => [],
  lazy: true,
  server: false,
})

const email = computed(() => contacts.value.find(item => item.hrefPref === 'mailto:'))

// The design lists these four, in this order.
const socialHosts = ['github.com', 'linkedin.com', 't.me', 'strava.com']
const socials = computed(() => socialHosts
  .map(host => contacts.value.find(item => item.href.includes(host)))
  .filter(item => item !== undefined))

const marquee = computed(() => t('menu.marquee').split(' · '))

// Layout
const dialog = ref<HTMLElement | null>(null)

function number(index: number) {
  return String(index + 1).padStart(2, '0')
}

function focusCycle() {
  const inside = dialog.value
    ? [...dialog.value.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )]
        .filter(element => element.offsetParent !== null)
    : []

  return props.toggle ? [props.toggle, ...inside] : inside
}

// On the document while open: focus starts on the burger, outside the dialog.
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
    return
  }

  if (event.key !== 'Tab') {
    return
  }

  /*
   * Every Tab is handled here, not just the wrap at either end: the dialog is
   * teleported to the end of <body>, so the browser's own next stop after the
   * burger is the page behind the menu, not the menu.
   */
  const cycle = focusCycle()
  const index = cycle.indexOf(document.activeElement as HTMLElement)
  const next = index === -1
    ? 0
    : (index + (event.shiftKey ? -1 : 1) + cycle.length) % cycle.length

  event.preventDefault()
  cycle[next]?.focus()
}

// Scroll lock on <html>, so the page behind the menu stays put.
watch(() => props.open, isOpen => {
  if (!import.meta.client) {
    return
  }

  document.documentElement.style.overflow = isOpen ? 'hidden' : ''

  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  }
  else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="menu">
      <div
        v-if="open"
        :id="id"
        ref="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('menu.dialog')"
        class="menu"
      >
        <nav :aria-label="$t('a11y.sections')">
          <ul class="m-0 p-0 list-none">
            <li
              v-for="(page, index) in pages"
              :key="page.path"
            >
              <NuxtLinkLocale
                :to="page.path"
                class="menu__link"
                :class="{ 'menu__link--active': page.active }"
                :aria-current="page.active ? 'page' : undefined"
                @click="emit('close')"
              >
                <span class="menu__name">{{ page.name }}</span>
                <span
                  class="menu__num"
                  :class="{ 'menu__num--first': index === 0 }"
                  aria-hidden="true"
                >{{ number(index) }}</span>
              </NuxtLinkLocale>
            </li>
          </ul>
        </nav>

        <div class="menu__info gut">
          <a
            v-if="email"
            :href="`${email.hrefPref}${email.href}`"
          >{{ email.value }}</a>

          <p
            v-if="socials.length"
            class="m-0"
          >
            <template
              v-for="(social, index) in socials"
              :key="social.href"
            >
              <span
                v-if="index"
                aria-hidden="true"
              > · </span>
              <a
                :href="social.href"
                target="_blank"
                rel="noopener"
              >{{ social.title }}</a>
            </template>
          </p>

          <p class="m-0 text-accentText">
            <span aria-hidden="true">●</span> {{ $t('menu.offers') }}
          </p>
        </div>

        <TheMarquee
          class="menu__marquee"
          :items="marquee"
        />

        <!-- The header drops HIRE ME on phones; it lives here instead. -->
        <NuxtLinkLocale
          to="/contacts"
          class="menu__hire nav-hire"
          @click="emit('close')"
        >
          {{ $t('nav.hire') }} <span aria-hidden="true">→</span>
        </NuxtLinkLocale>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.menu {
  @apply fixed inset-x-0 bottom-0 z-10 flex flex-col overflow-y-auto bg-bg text-fg;
  top: var(--header-h, 0px);
  @apply font-mono font-800 text-[11px] tracking-[.06em] uppercase;
  overscroll-behavior: contain;

  &__link {
    @apply flex justify-between items-center gap-4 px-4 py-[26px] b-0 bw-b b-solid b-line no-underline text-fg;

    &:hover {
      @apply bg-surface;
    }

    &--active {
      @apply bg-accent text-onAccent;

      .menu__num {
        @apply text-onAccent;
      }
    }
  }

  &__name {
    @apply font-display font-900 uppercase leading-none tracking-[-.04em];
    font-size: 44px;
    overflow-wrap: anywhere;
  }

  &__num {
    @apply text-muted;

    &--first {
      @apply text-accentText;
    }
  }

  &__info {
    @apply flex flex-col gap-2 py-6 text-[12px] font-400 normal-case tracking-normal text-muted;

    a {
      @apply text-muted underline-offset-3 hover:text-fg;
    }
  }

  &__marquee {
    @apply mt-auto;

    :deep(.marquee-track) {
      @apply text-base;
    }
  }

  &__hire {
    @apply hidden justify-between b-l-0 px-4 py-4 text-[12px];

    @media (max-width: 520px) {
      display: flex;
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active {
    transition: opacity 0.1s linear;
  }

  .menu-enter-from,
  .menu-leave-to {
    transform: none;
  }
}
</style>
