import React from 'react'

export type IPlanCode =
  | 'radiabee:plan:freetrial'
  | 'radiabee:plan:edu'
  | 'radiabee:plan:vanilla'
  | 'radiabee:plan:pro'

export interface IPlan {
  id: string
  code: IPlanCode
  alias: string
  featureSearch: boolean
  allLayerSwitch: boolean
  groupLayedSwitch: boolean
  featureCluster: boolean
  basemapOpacity: boolean
  layerSwipe: boolean
  googleStreetView: boolean
  featureLinkShare: boolean
  tgosLayer: number | null
  wmtsLayer: number | null
  vectorLayer: number | null
  weatherInfo: boolean
  navigation: boolean
  gpsLocate: boolean
  customPlatformDesc: boolean
  user: number
}

export const PlanCodeMap: Record<
  IPlanCode,
  { title: JSX.Element; desc: string }
> = {
  'radiabee:plan:freetrial': {
    title: (
      <span className="text-base inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        哈密瓜體驗版
      </span>
    ),
    desc: ''
  },
  'radiabee:plan:edu': {
    title: (
      <span className="text-base inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        哈密瓜教育推廣版
      </span>
    ),
    desc: ''
  },
  'radiabee:plan:vanilla': {
    title: (
      <span className="text-base inline-flex items-center rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        哈密瓜
      </span>
    ),
    desc: ''
  },
  'radiabee:plan:pro': {
    title: (
      <span className="text-base inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        哈密瓜Pro
      </span>
    ),
    desc: ''
  }
}

export type PlanFindAllQuery = {
  ParamType: unknown
  ResponseType: IPlan[]
}
