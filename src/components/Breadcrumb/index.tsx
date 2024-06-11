import { ThemeContext } from '@/providers/theme'
import {
  BeakerIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  ChartPieIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  CogIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  GlobeAltIcon,
  HomeIcon,
  MapIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
  Square3Stack3DIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useCookies } from 'next-client-cookies'
import { usePathname } from 'next/navigation'
import { LocaleContext } from '../../providers/i18n'
import { StatusContext } from '../../providers/status'

const pathIcons: { [key: string]: React.ReactNode } = {
  home: <HomeIcon className="h-5 w-5" />,
  layer: <Square3Stack3DIcon className="h-5 w-5" />,
  story: <BookOpenIcon className="h-5 w-5" />,
  cloud: <CloudArrowUpIcon className="h-5 w-5" />,
  setting: <CogIcon className="h-5 w-5" />,
  map: <MapIcon className="h-5 w-5" />,
  layerEditor: <PencilSquareIcon className="h-5 w-5" />,
  manifest: <GlobeAltIcon className="h-5 w-5" />,
  users: <UsersIcon className="h-5 w-5" />,
  wmts: <GlobeAltIcon className="h-5 w-5" />,
  vector: <RectangleGroupIcon className="h-5 w-5" />,
  management: <CommandLineIcon className="h-5 w-5" />,
  center: <CpuChipIcon className="h-5 w-5" />,
  org: <FireIcon className="h-5 w-5" />,
  dev: <BeakerIcon className="h-5 w-5" />,
  earth: <CubeIcon className="h-5 w-5" />,
  'symbol-playground': <ChartPieIcon className="h-5 w-5" />
}

const PathContent = ({ paths }: { paths: string[] }) => {
  const { pathLocaleBundle } = useContext(LocaleContext)
  const cookie = useCookies()
  return (
    <>
      {paths.length === 0 ? (
        <span className="loading loading-dots loading-md z-10"></span>
      ) : (
        <ul>
          <li>
            <a className="gap-1 z-10">
              <BuildingOffice2Icon className="h-5 w-5" />
              {cookie.get('orgCode')}
            </a>
          </li>
          {paths.slice(1, paths.length).map((path, index) => {
            return (
              <li key={index}>
                <a className="gap-1 z-10">
                  {pathIcons[path]}
                  {pathLocaleBundle[path] ? pathLocaleBundle[path] : path}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

const LinearLoading = () => {
  const { status } = useContext(StatusContext)
  return (
    <div
      className={classNames({
        'progress left-right absolute top-0 left-0 w-full h-full bg-accent z-0 rounded-none':
          true,
        hidden: status !== 'loading'
      })}
    ></div>
  )
}

const Alert = () => {
  const { status, message, onAlertClose } = useContext(StatusContext)
  const { themeMode } = useContext(ThemeContext)

  const ReverseProgress = () => (
    <div
      className={classNames({
        'reverse-progress absolute bottom-0 left-0 w-full h-[4px] z-30': true,
        'bg-black': themeMode === 'light',
        'bg-white': themeMode === 'dark'
      })}
    ></div>
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status !== 'loading') onAlertClose()
    }, 2500)
    return () => {
      clearTimeout(timer)
    }
  }, [status])

  return (
    <div
      className={classNames({
        'absolute top-0 left-0 w-full h-full z-20 rounded-none text-black p-4 flex items-center justify-between':
          true,
        'bg-success': status === 'success',
        'bg-error': status === 'error',
        'bg-warning': status === 'warning',
        hidden: status === 'loading' || status === 'none'
      })}
    >
      <div className="flex items-center gap-2">
        {status === 'success' && <CheckCircleIcon className="w-6 h-6" />}
        {status === 'error' && <ExclamationCircleIcon className="w-6 h-6" />}
        {status === 'warning' && (
          <ExclamationTriangleIcon className="w-6 h-6" />
        )}
        <div className="text-xs font-light">{message}</div>
      </div>
      <button
        onClick={onAlertClose}
        className="btn btn-circle btn-sm bg-inherit border-transparent text-black hover:bg-inherit hover:border-transparent"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
      {(status === 'success' || status === 'error' || status === 'warning') && (
        <ReverseProgress />
      )}
    </div>
  )
}

const Breadcrumb = () => {
  const pathname = usePathname()
  const { locale } = useContext(LocaleContext)
  const [paths, setpaths] = useState<string[]>([])

  const trimSpecificCharacters = (str: string, charToRemove: string) => {
    const regex = new RegExp(`^${charToRemove}+|${charToRemove}+$`, 'g')
    return str.replace(regex, '')
  }

  useEffect(() => {
    if (pathname === '/') {
      setpaths(['home'])
      return
    }
    const newpaths = trimSpecificCharacters(pathname, '/').split('/')
    setpaths(newpaths)
  }, [pathname, locale])

  return (
    <div className="relative overflow-hidden text-sm min-h-[52px] breadcrumbs bg-primary text-white py-4 px-4 flex items-center justify-start w-full">
      <LinearLoading />
      <Alert />
      <PathContent paths={paths} />
    </div>
  )
}

export default Breadcrumb
