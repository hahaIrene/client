import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'next-client-cookies'
import langEn from './en'
import langZh from './zh'

export type Locale = 'en' | 'zh'

export interface ILocalePackage {
  schema: Locale
  side: {
    home: string
    web: string
    layerEditor: string
    users: string
    mapSetting: string
    baseSetting: string
    tileSetting: string
    manifest: string
    layer: string
    storyLayers: string
    cloud: string
    upgrade: string
    vectorLayers: string
    logout: string
  }
  mapsetting: {
    button: string
  }
  notfound: {
    condition: string
    statement: string
    backHome: string
    reload: string
  }
}

const localeBundle = {
  en: langEn,
  zh: langZh
}

export const useLocale = () => {
  const cookies = useCookies()
  const [locale, setlocale] = useState<Locale>('en')
  const [t, sett] = useState<ILocalePackage>(localeBundle['en'])

  const pathLocaleBundle: { [key: string]: string } = {
    home: t.side.home,
    layer: t.side.layer,
    story: t.side.storyLayers,
    cloud: t.side.cloud,
    setting: t.side.web,
    users: t.side.users,
    map: t.side.mapSetting,
    basemap: t.side.baseSetting,
    tile: t.side.tileSetting,
    manifest: t.side.manifest,
    layerEditor: t.side.layerEditor,
    wmts: t.side.tileSetting,
    vector: t.side.vectorLayers,
    management: '管理',
    center: '中控台',
    org: '組織'
  }

  const switchLocale = (locale: Locale) => {
    setlocale(locale)
    sett(localeBundle[locale])
    cookies.set('locale', locale)
  }

  useEffect(() => {
    const cookieLocale = cookies.get('locale')
    if (!cookieLocale) {
      const userLanguage = navigator.language
      if (userLanguage === 'en-US') {
        cookies.set('locale', 'en')
        switchLocale('en')
        return
      }
      if (userLanguage === 'zh-TW') {
        cookies.set('locale', 'zh')
        switchLocale('zh')
        return
      }
      switchLocale('en')
      cookies.set('locale', 'en')
      return
    }
    if (cookieLocale === 'en' || cookieLocale === 'zh')
      switchLocale(cookieLocale)
  }, [])

  return { t, locale, pathLocaleBundle, switchLocale }
}

interface ILocaleContext {
  t: ILocalePackage
  locale: Locale
  pathLocaleBundle: { [key: string]: string }
  switchLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<ILocaleContext>({
  t: langEn,
  locale: 'en',
  pathLocaleBundle: {},
  switchLocale: () => {}
})

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { t, locale, pathLocaleBundle, switchLocale } = useLocale()

  return (
    <LocaleContext.Provider
      value={{
        t,
        locale,
        pathLocaleBundle,
        switchLocale
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleProvider
