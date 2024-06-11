import { LocaleContext } from '@/providers/i18n'
import {
  BeakerIcon,
  BookOpenIcon,
  ChartPieIcon,
  CogIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  FireIcon,
  GlobeAltIcon,
  MapIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
  Square3Stack3DIcon,
  UsersIcon
} from '@heroicons/react/24/solid'
import React, { createContext, useContext } from 'react'

export interface IRouteSection {
  code: string
  mainTitle: string
  icon: React.ReactNode
  routes: IRoute[]
}

export interface IRoute {
  title: string
  icon: React.ReactNode
  href: string
  chip?: React.ReactNode | undefined
}

interface IRouteContext {
  routeSections: IRouteSection[]
}

export const RoutesContext = createContext<IRouteContext>({ routeSections: [] })

const RoutesProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useContext(LocaleContext)

  const routeSections: IRouteSection[] = [
    {
      code: 'general',
      mainTitle: t.side.web,
      icon: <CogIcon className="h-5 w-5" />,
      routes: [
        {
          title: t.side.mapSetting,
          icon: <MapIcon className="h-5 w-5" />,
          href: '/setting/map'
        },
        {
          title: t.side.layerEditor,
          icon: <PencilSquareIcon className="h-5 w-5" />,
          href: '/setting/layerEditor'
        },
        {
          title: t.side.manifest,
          icon: <GlobeAltIcon className="h-5 w-5" />,
          href: '/setting/manifest'
        }
      ]
    },
    {
      code: 'layer',
      mainTitle: t.side.layer,
      icon: <Square3Stack3DIcon className="h-5 w-5" />,
      routes: [
        {
          title: t.side.storyLayers,
          icon: <BookOpenIcon className="h-5 w-5" />,
          href: '/layer/story'
        },

        {
          title: t.side.tileSetting,
          icon: <GlobeAltIcon className="h-5 w-5" />,
          href: '/layer/wmts'
        },
        {
          title: t.side.vectorLayers,
          icon: <RectangleGroupIcon className="h-5 w-5" />,
          href: '/layer/vector'
        }
      ]
    },
    {
      code: 'mgnmt',
      mainTitle: '管理',
      icon: <CommandLineIcon className="h-5 w-5" />,
      routes: [
        {
          title: t.side.users,
          icon: <UsersIcon className="h-5 w-5" />,
          href: '/management/users'
        }
      ]
    },
    {
      code: 'center',
      mainTitle: '中控台',
      icon: <CpuChipIcon className="h-5 w-5" />,
      routes: [
        {
          title: '組織',
          icon: <FireIcon className="h-5 w-5" />,
          href: '/center/org'
        }
      ]
    },
    {
      code: 'dev',
      mainTitle: '實驗性項目',
      icon: <BeakerIcon className="h-5 w-5" />,
      routes: [
        {
          title: '3D地圖',
          icon: <CubeIcon className="h-5 w-5" />,
          href: '/dev/earth'
        },
        {
          title: '樣式編輯器',
          icon: <ChartPieIcon className="h-5 w-5" />,
          href: '/dev/symbol-playground'
        }
      ]
    }
  ]

  return (
    <RoutesContext.Provider value={{ routeSections }}>
      {children}
    </RoutesContext.Provider>
  )
}

export default RoutesProvider
