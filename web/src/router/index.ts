// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { createRouter, createWebHistory } from 'vue-router'
import { useInitStore } from '@/stores/init'
import { useUserStore } from '@/stores/user'
import { useEchoStore } from '@/stores/echo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (to.name === 'home' || to.name === 'zen') {
      return false
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue'),
      meta: {
        titleKey: 'homeSidebar.home',
        descriptionKey: 'seo.homeDescription',
        optionalAuth: true,
      },
    },
    {
      path: '/publish',
      name: 'publish',
      redirect: { name: 'home', query: { tab: 'publish' } },
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('../views/panel/PanelView.vue'),
      redirect: '/panel/dashboard',
      meta: {
        titleKey: 'seo.panel',
        descriptionKey: 'seo.panelDescription',
        requiresAuth: true,
        noindex: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'panel-dashboard',
          component: () => import('../views/panel/modules/TheDashboard.vue'),
        },
        {
          path: 'setting',
          name: 'panel-setting',
          component: () => import('../views/panel/modules/TheSetting.vue'),
        },
        {
          path: 'user',
          name: 'panel-user',
          component: () => import('../views/panel/modules/TheUser.vue'),
        },
        {
          path: 'storage',
          name: 'panel-storage',
          component: () => import('../views/panel/modules/TheStorage.vue'),
        },
        {
          path: 'data-management',
          name: 'panel-data-management',
          component: () => import('../views/panel/modules/TheDataManagement.vue'),
        },
        {
          path: 'sso',
          name: 'panel-sso',
          component: () => import('../views/panel/modules/TheSSO.vue'),
        },
        {
          path: 'extension',
          name: 'panel-extension',
          component: () => import('../views/panel/modules/TheExtension.vue'),
        },
        {
          path: 'comment',
          name: 'panel-comment',
          component: () => import('../views/panel/modules/TheCommentManager.vue'),
        },
        {
          path: 'advance',
          name: 'panel-advance',
          component: () => import('../views/panel/modules/TheAdvance.vue'),
        },
        {
          path: 'system-log',
          name: 'panel-system-log',
          component: () => import('../views/panel/modules/TheSystemLog.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthView.vue'),
      meta: {
        titleKey: 'authPage.login',
        descriptionKey: 'seo.authDescription',
        noindex: true,
      },
    },
    {
      path: '/device',
      name: 'device',
      component: () => import('../views/device/DeviceView.vue'),
      meta: {
        titleKey: 'devicePage.codeLabel',
        descriptionKey: 'seo.deviceDescription',
        requiresAuth: true,
        noindex: true,
      },
    },
    {
      path: '/oauth/authorize',
      name: 'oauth-authorize',
      component: () => import('../views/oauth/AuthorizeView.vue'),
      meta: {
        titleKey: 'oauthConsent.title',
        descriptionKey: 'seo.oauthDescription',
        requiresAuth: true,
        noindex: true,
      },
    },
    {
      path: '/widget',
      name: 'widget',
      component: () => import('../views/widget/WidgetView.vue'),
      meta: {
        titleKey: 'seo.widget',
        descriptionKey: 'seo.widgetDescription',
        noindex: true,
      },
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('../views/init/InitView.vue'),
      meta: {
        titleKey: 'init.initialize',
        descriptionKey: 'seo.initDescription',
        noindex: true,
      },
    },
    {
      path: '/hub',
      name: 'hub',
      component: () => import('../views/hub/HubView.vue'),
      meta: {
        titleKey: 'homeSidebar.plaza',
        descriptionKey: 'seo.hubDescription',
      },
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/ChatView.vue'),
      meta: {
        titleKey: 'chatLauncher.title',
        descriptionKey: 'seo.chatDescription',
        requiresAuth: true,
        noindex: true,
      },
    },
    {
      path: '/zen',
      name: 'zen',
      component: () => import('../views/zen/ZenView.vue'),
      meta: {
        titleKey: 'seo.zen',
        descriptionKey: 'seo.zenDescription',
        optionalAuth: true,
        noindex: true,
      },
    },
    {
      path: '/echo/:echoId',
      name: 'echo',
      component: () => import('../views/echo/EchoView.vue'),
      beforeEnter: (to) => {
        const echoId = String(to.params.echoId ?? '').trim()
        if (echoId) {
          useEchoStore().prefetchEcho(echoId)
        }
        return true
      },
      meta: {
        titleKey: 'seo.echo',
        descriptionKey: 'seo.echoDescription',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/AboutView.vue'),
      meta: {
        titleKey: 'seo.about',
        descriptionKey: 'seo.aboutDescription',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/privacy/PrivacyView.vue'),
      meta: {
        titleKey: 'privacy.footerLink',
        descriptionKey: 'seo.privacyDescription',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404/NotFoundView.vue'),
      meta: {
        titleKey: 'notFound.pageNotFound',
        descriptionKey: 'seo.notFoundDescription',
        noindex: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const initStore = useInitStore()
  const userStore = useUserStore()

  if (!initStore.ready) {
    await initStore.init()
  }

  const isInitReady = initStore.initialized || initStore.ownerExists

  if (!isInitReady && to.name !== 'init') {
    return { name: 'init' }
  }

  if (isInitReady && to.name === 'init') {
    return { name: 'auth' }
  }

  if (!userStore.initialized) {
    await userStore.init()
  }

  const needRedirect = localStorage.getItem('needLoginRedirect')

  if (
    (to.meta.requiresAuth && !userStore.isLogin) ||
    (to.meta.optionalAuth && !userStore.isLogin && needRedirect === 'true')
  ) {
    localStorage.removeItem('needLoginRedirect')
    // Keep the full target so protected deep links (e.g. /device?code=...) survive login.
    return { name: 'auth', query: { redirect: to.fullPath } }
  }

  return true
})

export default router
