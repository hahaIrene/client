'use client'

import { AuthContext } from '@/providers/auth'
import { AppContext } from '@/providers/health'
import { RoutesContext } from '@/providers/routes'
import React, { useContext, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { Noto_Sans_TC } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProgressLoader } from 'nextjs-progressloader'
import { ThemeContext } from '../../providers/theme'
import Breadcrumb from '../Breadcrumb'

const noto = Noto_Sans_TC({
  weight: '500',
  subsets: ['latin']
})

interface ISideBar {
  children: React.ReactNode
}

const SideBar = ({ children }: ISideBar) => {
  const path = usePathname()
  const cookie = useCookies()
  const cookies = useCookies()
  const { themeMode } = useContext(ThemeContext)
  const { routeSections } = useContext(RoutesContext)
  const { user, getProfile } = useContext(AuthContext)
  const { onAppHealthChange } = useContext(AppContext)
  const isUserOnSignInPage = path.includes('signIn') // || path.includes('dev')

  const getData = async () => {
    if (isUserOnSignInPage) return
    const access_token = cookie.get('token')
    const orgCode = cookie.get('orgCode')
    if (!access_token || !orgCode) {
      return
    }
    await getProfile(access_token)
    await onAppHealthChange({ orgCode })
  }

  useEffect(() => {
    getData()
  }, [path])

  return (
    <div
      className={`${noto.className} w-full bg-transparent`}
      data-theme={themeMode}
    >
      {isUserOnSignInPage ? (
        <div>{children}</div>
      ) : (
        <div className="drawer lg:drawer-open ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="bg-base-100 drawer-content flex flex-col items-center justify-center">
            <Breadcrumb />
            <ProgressLoader height={5} />
            {children}
          </div>
          <div className="border-r border-neutral-400 drawer-side z-30">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
              <div>
                <div className="w-full flex items-center justify-center pt-4">
                  <li>
                    <Link href={`/${cookies.get('orgCode')}`}>
                      <p>Ｍａｐｌｏｎ</p>
                    </Link>
                  </li>
                </div>
                <div className="divider"></div>
                {routeSections.map((section, index) => {
                  if (section.code === 'mgnmt' && !user?.isAdmin) return null
                  if (section.code === 'center' && !user?.isRoot) return null
                  if (section.code === 'dev' && !user?.isRoot) return null

                  return (
                    <li key={index}>
                      <h2 className="menu-title flex gap-2 items-center">
                        {section.icon}
                        {section.mainTitle}
                      </h2>
                      <ul>
                        {section.routes.map((route, index) => {
                          return (
                            <li key={index}>
                              <Link
                                href={`/${cookies.get('orgCode')}${route.href}`}
                              >
                                {route.icon}
                                {route.title}
                                {route.chip}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBar
