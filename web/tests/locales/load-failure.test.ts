// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { describe, expect, it, vi } from 'vitest'
import {
  applyI18nLocale,
  i18n,
  LOCALE_STORAGE_KEY,
  setBrowserLocale,
  setMemberLocale,
} from '@/locales'

vi.mock('@/locales/messages/ja-JP.json', () => {
  throw new Error('unavailable locale chunk')
})

const member = { id: 'member', is_admin: false, locale: 'en-US' }

describe('locale preference transactions', () => {
  it('leaves a browser preference intact when its replacement is unavailable', async () => {
    await setBrowserLocale('en-US')

    await expect(setBrowserLocale('ja-JP')).rejects.toThrow()
    expect(i18n.global.locale.value).toBe('en-US')
    expect(document.documentElement.lang).toBe('en-US')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"en-US"')

    vi.resetModules()
    const restarted = await import('@/locales')
    await restarted.applyI18nLocale()
    expect(restarted.i18n.global.locale.value).toBe('en-US')
    expect(document.documentElement.lang).toBe('en-US')
  })

  it('leaves a member override intact on failure and restores it after reload', async () => {
    await setBrowserLocale('en-US')
    await setMemberLocale(member, 'fr-FR')

    await expect(setMemberLocale(member, 'ja-JP')).rejects.toThrow()
    expect(i18n.global.locale.value).toBe('fr-FR')
    expect(document.documentElement.lang).toBe('fr-FR')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"en-US"')

    vi.resetModules()
    const restarted = await import('@/locales')
    await restarted.applyI18nLocale(member)
    expect(restarted.i18n.global.locale.value).toBe('fr-FR')
    await restarted.applyI18nLocale()
    expect(restarted.i18n.global.locale.value).toBe('en-US')
  })

  it('does not persist or apply an outdated explicit locale selection', async () => {
    await applyI18nLocale()
    await Promise.all([setBrowserLocale('de-DE'), setBrowserLocale('fr-FR')])

    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"fr-FR"')
    expect(i18n.global.locale.value).toBe('fr-FR')
    expect(document.documentElement.lang).toBe('fr-FR')
  })
})
