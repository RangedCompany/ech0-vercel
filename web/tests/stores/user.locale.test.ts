// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { createPinia, setActivePinia } from 'pinia'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TheLocaleToggle from '@/components/common/TheLocaleToggle.vue'
import { useUserStore } from '@/stores/user'
import { LOCALE_STORAGE_KEY, i18n, setBrowserLocale, setI18nSiteLocale } from '@/locales'

const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  refreshFeed: vi.fn(),
  updateUser: vi.fn(),
  localeError: vi.fn(),
}))

vi.mock('@/service/api', () => ({ fetchGetCurrentUser: mocks.getUser }))
vi.mock('@/router', () => ({ default: {} }))
vi.mock('@/stores', async () => ({ useUserStore: (await import('@/stores/user')).useUserStore }))
vi.mock('@/service/api/user', () => ({ fetchUpdateUser: mocks.updateUser }))
vi.mock('@/utils/toast', () => ({ theToast: { error: mocks.localeError } }))
vi.mock('@/locales/messages/zh-CN.json', () => {
  throw new Error('unavailable locale chunk')
})

vi.mock('@/stores/echo', () => ({ useEchoStore: () => ({ refreshEchos: mocks.refreshFeed }) }))
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({ logout: async () => {}, clearToken() {} }),
}))

describe('account locale on session transitions', () => {
  it('applies login and account changes without replacing the anonymous choice, then restores it on logout', async () => {
    setActivePinia(createPinia())
    await setI18nSiteLocale('en-US')
    await setBrowserLocale('de-DE')
    const store = useUserStore()

    mocks.getUser.mockResolvedValue({ code: 1, data: { username: 'un', locale: 'fr-CA' } })
    await store.refreshCurrentUser()
    expect(i18n.global.locale.value).toBe('fr-FR')

    mocks.getUser.mockResolvedValue({ code: 1, data: { username: 'deux', locale: 'ja-JP' } })
    await store.refreshCurrentUser()
    expect(i18n.global.locale.value).toBe('ja-JP')

    await store.logout()
    expect(i18n.global.locale.value).toBe('de-DE')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"de-DE"')
    expect(mocks.refreshFeed).toHaveBeenCalledOnce()
  })

  it('keeps a member’s local language across reloads without sending an unauthorized profile update', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    await setI18nSiteLocale('en-US')
    await setBrowserLocale('de-DE')
    const member = { id: 'member-1', username: 'membre', is_admin: false, locale: 'en-US' }
    mocks.getUser.mockImplementation(async () => ({ code: 1, data: { ...member } }))

    const userStore = useUserStore()
    await userStore.refreshCurrentUser()
    expect(i18n.global.locale.value).toBe('en-US')
    const toggle = mount(TheLocaleToggle, {
      global: { plugins: [pinia, i18n], directives: { tooltip: {} } },
    })
    try {
      await toggle.get('button[aria-haspopup="menu"]').trigger('click')
      const french = toggle
        .findAll('[role="menuitemradio"]')
        .find((item) => item.text() === 'Français')
      expect(french).toBeDefined()
      await french!.trigger('click')
      await flushPromises()
      expect(i18n.global.locale.value).toBe('fr-FR')
      expect(mocks.updateUser).not.toHaveBeenCalled()

      // A new store gets an unmodified account DTO, just as it would after a reload.
      setActivePinia(createPinia())
      const reloaded = useUserStore()
      await reloaded.refreshCurrentUser()
      expect(reloaded.user?.locale).toBe('en-US')
      expect(i18n.global.locale.value).toBe('fr-FR')

      await reloaded.logout()
      expect(i18n.global.locale.value).toBe('de-DE')
      expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"de-DE"')

      mocks.getUser.mockResolvedValue({ code: 1, data: { ...member, id: 'member-2' } })
      await reloaded.refreshCurrentUser()
      expect(i18n.global.locale.value).toBe('en-US')

      mocks.getUser.mockResolvedValue({ code: 1, data: { ...member, is_admin: true } })
      await reloaded.refreshCurrentUser()
      expect(i18n.global.locale.value).toBe('en-US')
    } finally {
      toggle.unmount()
    }
  })

  it('does not update the server or display an unavailable catalog chosen by an admin', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    mocks.getUser.mockResolvedValue({
      code: 1,
      data: { id: 'admin', username: 'admin', is_admin: true, locale: 'fr-FR' },
    })
    const userStore = useUserStore()
    await userStore.refreshCurrentUser()
    const toggle = mount(TheLocaleToggle, {
      global: { plugins: [pinia, i18n], directives: { tooltip: {} } },
    })
    try {
      await toggle.get('button[aria-haspopup="menu"]').trigger('click')
      const chinese = toggle
        .findAll('[role="menuitemradio"]')
        .find((item) => item.text() === '简体中文')
      expect(chinese).toBeDefined()
      await chinese!.trigger('click')
      await vi.waitFor(() =>
        expect(mocks.localeError).toHaveBeenCalledWith('Impossible de changer de langue'),
      )

      expect(mocks.updateUser).not.toHaveBeenCalled()
      expect(i18n.global.locale.value).toBe('fr-FR')
      expect(userStore.user?.locale).toBe('fr-FR')
      expect(toggle.get('button[aria-haspopup="menu"]').attributes('disabled')).toBeUndefined()
    } finally {
      toggle.unmount()
    }
  })
})
