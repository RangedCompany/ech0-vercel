<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- Copyright (C) 2025-2026 lin-snow -->
<template>
  <div class="home-page">
    <div class="home-shell">
      <div class="home-layout">
        <div
          ref="mainColumn"
          class="home-main"
          :class="{ 'home-main--unclipped': activeTab === 'tags' }"
        >
          <div class="home-main-track">
            <HomeHeader class="mb-3 mx-1" />
            <aside class="home-aside home-aside--mobile">
              <HomeSidebarNav
                v-model:mobile-search-open="mobileSearchOpen"
                class="mx-1"
                @open-palette="paletteOpen = true"
                @open-chat="chatLauncherOpen = true"
              />
            </aside>
            <div
              v-if="activeTab === 'publish'"
              class="home-content-block home-content-block--publish"
            >
              <TheEditor />
            </div>
            <div v-else-if="activeTab === 'tags'" class="home-content-block">
              <TheTagsManager />
            </div>

            <template v-else-if="activeTab === 'home'">
              <HomeBanner :class="{ 'home-banner--mobile-hidden': shouldHideBannerOnMobile }" />

              <TheEchos compact :scroll-target="mainColumn" />
            </template>

            <div v-else-if="activeTab === 'status'" class="home-content-block home-status-widgets">
              <TheHeatMap />
              <TheRecentCard v-if="AgentSetting.enable" />
              <TheConnectWidget />
              <TheCommentWidget />
            </div>
            <HubPage v-else embedded :scroll-target="mainColumn" />
          </div>
        </div>

        <aside class="home-aside home-aside--rail">
          <HomeSidebarNav />
          <div class="home-aside__filter-block">
            <TheFilter
              show-chat-trigger
              @open-palette="paletteOpen = true"
              @open-chat="chatLauncherOpen = true"
            />
            <a
              :href="settingStore.hello?.repo_url || 'https://github.com/RangedCompany/ech0-vercel'"
              target="_blank"
              rel="noopener noreferrer"
              class="home-aside__version"
            >
              {{ t('homeSidebar.version', { version: settingStore.hello?.version || '--' }) }}
            </a>
          </div>
        </aside>
      </div>
    </div>
    <TheCommandPalette v-model="paletteOpen" />
    <TheChatLauncher v-model="chatLauncherOpen" />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './HomeHeader.vue'
import HomeBanner from './HomeBanner.vue'
import HomeSidebarNav from './HomeSidebarNav.vue'
import TheFilter from './TheFilter.vue'
import TheEchos from './TheEchos.vue'
import TheCommandPalette from './TheCommandPalette.vue'
import TheChatLauncher from './TheChatLauncher.vue'
import { defineAsyncComponent, onMounted, ref, onBeforeUnmount, computed, watch } from 'vue'
import { useEchoStore, useUserStore, useSettingStore, useConnectStore } from '@/stores'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import {
  TheCommentWidget,
  TheConnectWidget,
  TheHeatMap,
  TheRecentCard,
} from '@/components/advanced/widget'

const route = useRoute()
const { t } = useI18n()
const TheEditor = defineAsyncComponent(() => import('./TheEditor.vue'))
const TheTagsManager = defineAsyncComponent(() => import('./TheEditor/TheTagsManager.vue'))
const HubPage = defineAsyncComponent(() => import('@/views/hub/modules/HubPage.vue'))

const userStore = useUserStore()
const settingStore = useSettingStore()
const echoStore = useEchoStore()
const connectStore = useConnectStore()
const { isLogin } = storeToRefs(userStore)
const { AgentSetting } = storeToRefs(settingStore)
const { searchingMode, isFilteringMode } = storeToRefs(echoStore)
const mobileSearchOpen = ref(false)
const activeTab = computed<'home' | 'publish' | 'status' | 'tags' | 'hub'>(() => {
  if (route.query.tab === 'publish' && isLogin.value) return 'publish'
  if (route.query.tab === 'status') return 'status'
  if (route.query.tab === 'tags') return 'tags'
  if (route.query.tab === 'hub') return 'hub'
  return 'home'
})
const shouldHideBannerOnMobile = computed(
  () => mobileSearchOpen.value || searchingMode.value || isFilteringMode.value,
)

// Start the (potentially slow) connect lookup before the status widgets mount,
// so it never queues behind the AI Recent request on the status page.
watch(
  activeTab,
  (tab) => {
    if (tab === 'status') void connectStore.getConnectInfo()
  },
  { immediate: true },
)

const mainColumn = ref<HTMLElement | null>(null)

const paletteOpen = ref<boolean>(false)
const chatLauncherOpen = ref<boolean>(false)
const chatAvailable = computed(() => isLogin.value && AgentSetting.value.enable)

const handleGlobalKeydown = (event: KeyboardEvent) => {
  const withModifier = (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey
  const isSearchShortcut = withModifier && event.key === 'k'
  if (isSearchShortcut) {
    event.preventDefault()
    paletteOpen.value = !paletteOpen.value
    return
  }
  const isChatShortcut = withModifier && event.key === 'j'
  if (isChatShortcut && chatAvailable.value) {
    event.preventDefault()
    chatLauncherOpen.value = !chatLauncherOpen.value
    return
  }
  if (event.key === 'Escape') {
    if (paletteOpen.value) paletteOpen.value = false
    if (chatLauncherOpen.value) chatLauncherOpen.value = false
  }
}

const prefetchHeavyChunks = () => {
  const trigger = () => {
    import('@/views/echo/EchoView.vue').catch(() => {})
  }
  const ric = (window as Window & { requestIdleCallback?: typeof requestIdleCallback })
    .requestIdleCallback
  if (typeof ric === 'function') {
    ric(trigger, { timeout: 2000 })
  } else {
    window.setTimeout(trigger, 1500)
  }
}

onMounted(() => {
  if (mainColumn.value) {
    mainColumn.value.scrollLeft = 0
  }
  window.addEventListener('keydown', handleGlobalKeydown)
  prefetchHeavyChunks()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.home-page {
  min-height: 100dvh;
  background: var(--color-bg-canvas);
  color: var(--color-text-primary);
}

.home-shell {
  max-width: 86rem;
  margin-inline: auto;
  padding: 1rem clamp(0.75rem, 3vw, 3rem) 2rem;
}

.home-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.home-main-track {
  min-width: 0;
}

.home-main {
  min-width: 0;
}

.home-aside {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
}

.home-aside__filter-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.home-aside__version {
  display: inline-block;
  margin: 0;
  margin-top: 0.5rem;
  padding-inline: 0.5rem;
  font-family: var(--font-family-display);
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1.25;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.home-aside__version:hover {
  color: var(--color-text-primary);
}

.home-content-block {
  width: 100%;
}

.home-content-block--publish {
  max-width: 50rem;
  margin-inline: auto;
}

.home-status-widgets {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.home-aside--mobile {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

.home-aside--rail {
  display: none;
}

/* The same breakpoint separates the rail from the inline navigation in HomeSidebarNav. */
@media (width >= 820px) {
  .home-page {
    height: 100dvh;
    overflow: hidden;
  }

  .home-shell {
    height: 100%;
    padding-block: 0;
  }

  .home-layout {
    height: 100%;
    grid-template-columns: minmax(0, 1fr) clamp(13rem, 21vw, 17rem);
    gap: clamp(1.5rem, 4vw, 3.5rem);
  }

  .home-main {
    min-height: 0;
    padding: clamp(1.5rem, 4vh, 3rem) 0 2rem;
    overflow-y: auto;
    scrollbar-width: none;
    overscroll-behavior: contain;
  }

  .home-main--unclipped {
    overflow: visible auto;
  }

  .home-aside--mobile {
    display: none;
  }

  .home-aside--rail {
    display: flex;
    min-width: 0;
    min-height: 0;
    padding-block: clamp(1.5rem, 4vh, 3rem) 1rem;
    overflow-y: auto;
  }
}

@media (width < 820px) {
  .home-banner--mobile-hidden {
    display: none;
  }
}
</style>
