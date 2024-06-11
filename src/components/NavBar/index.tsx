import {
  Bars3CenterLeftIcon, // LanguageIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/solid'
import React, { useContext } from 'react'
// import classNames from 'classnames'
// import { LocaleContext } from '../../providers/i18n'
import { ThemeContext } from '../../providers/theme'

const NavBar = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, onThemeChange } = useContext(ThemeContext)
  // const { locale, switchLocale } = useContext(LocaleContext)

  return (
    <div>
      <div className="navbar bg-primary">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label
              htmlFor="my-drawer-2"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
            >
              <Bars3CenterLeftIcon className="h-5 w-5" />
            </label>
          </div>
        </div>
        <div className="navbar-end">
          {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <LanguageIcon className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content gap-1 mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                className={classNames({
                  ['active']: locale === 'en'
                })}
                onClick={() => {
                  switchLocale('en')
                }}
              >
                <span className="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50">
                  EN
                </span>
                English
              </button>
            </li>
            <li>
              <button
                className={classNames({
                  ['active']: locale === 'zh'
                })}
                onClick={() => {
                  switchLocale('zh')
                }}
              >
                <span className="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50">
                  ZH
                </span>
                繁體中文
              </button>
            </li>
          </ul>
        </div> */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => {
              if (themeMode === 'dark') {
                onThemeChange('light')
                return
              }
              onThemeChange('dark')
            }}
          >
            <div className="indicator">
              {themeMode === 'light' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </div>
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default NavBar
