import {
  BookOpenIcon,
  GlobeAltIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/solid'
import React from 'react'

export type LayerType = 'vector' | 'wmts' | 'story'

export const LayerTypeMap: {
  [K in LayerType]: { title: string; icon: JSX.Element }
} = {
  vector: {
    title: '向量圖層',
    icon: <RectangleGroupIcon className="h-5 w-5" />
  },
  wmts: { title: 'WMTS圖層', icon: <GlobeAltIcon className="h-5 w-5" /> },
  story: { title: '故事地圖', icon: <BookOpenIcon className="h-5 w-5" /> }
}

export default interface ILayer {
  id: string
  type: LayerType
  name: string
  updatedAt: string
}
