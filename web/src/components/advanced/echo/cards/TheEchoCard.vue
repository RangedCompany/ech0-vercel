<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- Copyright (C) 2025-2026 lin-snow -->
<template>
  <div class="echo-timeline group w-full">
    <div class="echo-header-sticky flex justify-between items-center">
      <div class="echo-date-group">
        <span class="timeline-marker" aria-hidden="true"></span>
        <RouterLink
          :to="{ name: 'echo', params: { echoId: props.echo.id } }"
          class="echo-date"
          v-tooltip="t('echoCard.openDetail')"
        >
          <span>{{ formatDate(props.echo.created_at) }}</span>
          <Open class="echo-open-icon" aria-hidden="true" />
        </RouterLink>
      </div>

      <div
        v-if="!userStore.isLogin && props.echo.private"
        v-tooltip="t('echoCard.privateStatus')"
        class="w-7 h-7 flex items-center justify-center bg-[var(--color-bg-surface)] ring-1 ring-[var(--color-border-subtle)] ring-inset rounded-full shadow-sm"
      >
        <Lock class="w-4 h-4" />
      </div>

      <EchoActionMenu v-else-if="userStore.isLogin" :echo="props.echo" />
    </div>

    <div class="timeline-content">
      <div v-if="leadsWithContent" class="timeline-prose mb-3">
        <TheMdPreview :content="props.echo.content" />
      </div>
      <div :class="{ 'timeline-av': isAvEcho }">
        <TheMediaPlayer
          :echo="props.echo"
          :layout="props.echo.layout"
          :priority="props.index === 0"
        />
      </div>
      <div v-if="!leadsWithContent" class="timeline-prose mt-3">
        <TheMdPreview :content="props.echo.content" />
      </div>
      <div v-if="props.echo.extension" class="my-2">
        <TheExtensionRenderer :echo="props.echo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores'
import { TheMdPreview } from '@/components/advanced/md'
import Lock from '@/components/icons/lock.vue'
import Open from '@/components/icons/open.vue'
import { RouterLink } from 'vue-router'
import { getEchoFilesBy, isContentLeadingEcho } from '@/utils/echo'
import { formatDate } from '@/utils/other'
import { useI18n } from 'vue-i18n'
import EchoActionMenu from '@/components/advanced/echo/EchoActionMenu.vue'

const TheMediaPlayer = defineAsyncComponent(
  () => import('@/components/advanced/media/TheMediaPlayer.vue'),
)
const TheExtensionRenderer = defineAsyncComponent(
  () => import('@/components/advanced/extension/TheExtensionRenderer.vue'),
)

const { t } = useI18n()

type Echo = App.Api.Ech0.Echo

const props = defineProps<{
  echo: Echo
  index?: number
}>()

const isAvEcho = computed(
  () => getEchoFilesBy(props.echo, { categories: ['audio', 'video'] }).length > 0,
)

const leadsWithContent = computed(() => isContentLeadingEcho(props.echo))

const userStore = useUserStore()
</script>

<style scoped>
.echo-header-sticky {
  position: relative;
  z-index: 1;
  gap: 0.5rem;
  min-height: 2.25rem;
  background-color: var(--color-bg-canvas);
}

.echo-timeline {
  --axis-offset: calc(0.25rem + 1px);
  --axis-line-width: 2px;
  --axis-dot-size: 0.5rem;

  min-width: 0;
}

.echo-date-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.timeline-marker {
  flex: none;
  width: var(--axis-dot-size);
  height: var(--axis-dot-size);
  margin-inline-start: calc(var(--axis-offset) - (var(--axis-dot-size) / 2));
  border-radius: 50%;
  background: var(--color-accent);
}

.echo-date {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
  padding-block: 0.45rem;
  color: var(--color-accent);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  overflow-wrap: anywhere;
  text-decoration: none;
}

.echo-date:hover,
.echo-date:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.echo-open-icon {
  flex: none;
  width: 0.875rem;
  height: 0.875rem;
  color: var(--color-text-muted);
}

.timeline-content {
  position: relative;
  margin-inline-start: var(--axis-offset);
  padding: 0.875rem clamp(0.875rem, 3vw, 2.25rem) 1.25rem;
  min-width: 0;
}

.timeline-prose {
  max-width: 72ch;
  font-family: var(--font-family-sans);
}

.timeline-av {
  max-width: 48rem;
}

.timeline-content::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  inset-inline-start: 0;
  width: var(--axis-line-width);
  background-color: var(--color-border-subtle);
  pointer-events: none;
}
</style>
