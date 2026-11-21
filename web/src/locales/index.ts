// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025-2026 lin-snow

import { createI18n } from 'vue-i18n'
import { localStg } from '@/utils/storage'

export const LOCALE_STORAGE_KEY = 'locale'
export const DEFAULT_LOCALE = 'fr-FR'
export const SUPPORTED_LOCALES = ['fr-FR', 'zh-CN', 'en-US', 'de-DE', 'ja-JP'] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]
type LocaleAccount = Pick<App.Api.User.User, 'id' | 'is_admin' | 'locale'>
const accountLocaleKey = (id: string) => `${LOCALE_STORAGE_KEY}:account:${id}`

export const LOCALE_ENDONYMS: Record<AppLocale, string> = {
  'fr-FR': 'Français',
  'zh-CN': '简体中文',
  'en-US': 'English',
  'de-DE': 'Deutsch',
  'ja-JP': '日本語',
}

export const LOCALE_OPTIONS = SUPPORTED_LOCALES.map((value) => ({
  value,
  label: LOCALE_ENDONYMS[value],
}))

const loadedLocales = new Set<AppLocale>()
let siteLocale = normalizeLocale(document.documentElement.lang)
let localeRevision = 0

export function normalizeLocale(raw?: string | null): AppLocale | undefined {
  if (typeof raw !== 'string') return undefined
  try {
    const language = new Intl.Locale(raw.trim()).language
    return SUPPORTED_LOCALES.find((locale) => locale.slice(0, 2) === language)
  } catch {
    return undefined
  }
}

function resolveI18nLocale(account?: LocaleAccount | null): AppLocale {
  // Admins can sync their choice to the server; members can only choose it
  // locally. A member's override must not follow other accounts or guests.
  const memberLocale =
    account?.id && !account.is_admin ? localStg.getItem<string>(accountLocaleKey(account.id)) : null
  return (
    normalizeLocale(memberLocale) ??
    normalizeLocale(account?.locale) ??
    normalizeLocale(localStg.getItem<string>(LOCALE_STORAGE_KEY)) ??
    siteLocale ??
    DEFAULT_LOCALE
  )
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: resolveI18nLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {},
})

async function loadLocaleMessages(locale: AppLocale) {
  if (loadedLocales.has(locale)) return
  const messages = await import(`./messages/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  loadedLocales.add(locale)
}

export async function prepareI18nLocale(locale: AppLocale): Promise<void> {
  await Promise.all([
    loadLocaleMessages(locale),
    locale === DEFAULT_LOCALE ? undefined : loadLocaleMessages(DEFAULT_LOCALE),
  ])
}

async function activateLocale(locale: AppLocale, storageKey?: string): Promise<void> {
  const revision = ++localeRevision
  await prepareI18nLocale(locale)
  if (revision !== localeRevision) return

  // Do not persist an unavailable catalogue or an outdated selection.
  if (storageKey) localStg.setItem(storageKey, locale)
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}

export function applyI18nLocale(account?: LocaleAccount | null): Promise<void> {
  return activateLocale(resolveI18nLocale(account))
}

export function setBrowserLocale(locale: AppLocale): Promise<void> {
  return activateLocale(locale, LOCALE_STORAGE_KEY)
}

export async function setMemberLocale(account: LocaleAccount, locale: AppLocale): Promise<void> {
  if (account.is_admin || !account.id) return
  await activateLocale(locale, accountLocaleKey(account.id))
}

export async function setI18nSiteLocale(defaultLocale: string, account?: LocaleAccount | null) {
  siteLocale = normalizeLocale(defaultLocale)
  await applyI18nLocale(account)
}
