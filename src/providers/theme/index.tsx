'use client'

import React, { createContext, useEffect, useState } from 'react'
import { useCookies } from 'next-client-cookies'

export type IThemeMode = 'light' | 'dark'

interface IThemeContext {
  themeMode: IThemeMode
  onThemeChange: (mode: IThemeMode) => void
}

export const ThemeContext = createContext<IThemeContext>({
  themeMode: 'light',
  onThemeChange: () => {}
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = useCookies()
  const [themeMode, setthemeMode] = useState<IThemeMode>('light')

  useEffect(() => {
    const cookieMode = cookies.get('themeMode')
    if (!cookieMode) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const mode = mediaQuery.matches ? 'dark' : 'light'
      setthemeMode(mode)
      cookies.set('themeMode', mode)
      return
    }
    if (cookieMode === 'light' || cookieMode === 'dark')
      setthemeMode(cookieMode)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        onThemeChange: (value) => {
          setthemeMode(value)
          cookies.set('themeMode', value)
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
