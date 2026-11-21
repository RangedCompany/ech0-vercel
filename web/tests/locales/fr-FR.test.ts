// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { describe, expect, it, vi } from 'vitest'
import {
  applyI18nLocale,
  i18n,
  LOCALE_OPTIONS,
  LOCALE_STORAGE_KEY,
  normalizeLocale,
  setBrowserLocale,
  setI18nSiteLocale,
} from '@/locales'
import { buildCommonHeaders } from '@/service/request/shared'
import { createPinia, setActivePinia } from 'pinia'

describe('French interface and locale precedence', () => {
  it('uses French without a preference even on an English browser', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US')
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US'])
    setActivePinia(createPinia())

    await setI18nSiteLocale('not-a-locale')
    expect(document.documentElement.lang).toBe('fr-FR')
    expect(i18n.global.t('homeSidebar.home')).toBe('Fil')
    expect(buildCommonHeaders()['X-Locale']).toBe('fr-FR')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull()
    expect(LOCALE_OPTIONS).toContainEqual({ value: 'fr-FR', label: 'Français' })
  })

  it('normalizes language tags and does not persist inferred choices', async () => {
    await setI18nSiteLocale('ja-JP')
    expect(i18n.global.locale.value).toBe('ja-JP')
    expect(normalizeLocale(' FR-ca ')).toBe('fr-FR')
    expect(normalizeLocale('french')).toBeUndefined()

    await applyI18nLocale({ id: 'admin', is_admin: true, locale: 'fr-CA' })
    expect(i18n.global.locale.value).toBe('fr-FR')
    expect(i18n.global.t('homeSidebar.version', { version: '5.4.0' })).toBe('Version : 5.4.0')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull()

    await applyI18nLocale()
    expect(i18n.global.locale.value).toBe('ja-JP')
  })

  it('keeps explicit browser language below account locale and above site locale', async () => {
    await setI18nSiteLocale('de-DE')
    await setBrowserLocale('de-DE') // Explicitly choosing the current automatic locale still saves it.
    await setI18nSiteLocale('ja-JP')
    expect(i18n.global.locale.value).toBe('de-DE')

    await applyI18nLocale({ id: 'admin', is_admin: true, locale: 'fr-CA' })
    await applyI18nLocale({ id: 'admin', is_admin: true, locale: 'en-US' })
    expect(i18n.global.locale.value).toBe('en-US')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('"de-DE"')

    await applyI18nLocale()
    expect(i18n.global.locale.value).toBe('de-DE')
  })

  it('lets the most recent locale win when catalogs are loading', async () => {
    await applyI18nLocale({ id: 'admin', is_admin: true, locale: 'fr' })
    await Promise.all([
      applyI18nLocale({ id: 'admin', is_admin: true, locale: 'ja' }),
      applyI18nLocale({ id: 'admin', is_admin: true, locale: 'fr' }),
    ])
    expect(i18n.global.locale.value).toBe('fr-FR')
    expect(document.documentElement.lang).toBe('fr-FR')
  })

  it('compiles all French catalog strings without fallback or syntax warnings', async () => {
    await applyI18nLocale({ id: 'admin', is_admin: true, locale: 'fr' })
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const messages = i18n.global.getLocaleMessage('fr-FR')
    function inspect(tree: Record<string, unknown>, prefix = '') {
      for (const [key, value] of Object.entries(tree)) {
        const path = prefix + key
        if (typeof value === 'string') {
          const params = Object.fromEntries(
            [...value.matchAll(/\{(\w+)\}/g)].map((match) => [match[1], '1']),
          )
          expect(i18n.global.t(path, params), path).not.toBe(path)
        } else if (value && typeof value === 'object') {
          inspect(value as Record<string, unknown>, path + '.')
        }
      }
    }
    inspect(messages)
    expect(error).not.toHaveBeenCalled()
    expect(warn).not.toHaveBeenCalled()
  })
})
