import { IStoryLayer } from '@/stores/types/api/story-layer'
import { IVectorLayer } from '@/stores/types/api/vector-layer'
import { IWmtsLayer } from '@/stores/types/api/wmts-layer'
import {
  BookOpenIcon,
  GlobeAltIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/solid'
import React from 'react'
import classNames from 'classnames'

const LayerItem = ({
  layer
}: {
  layer: IWmtsLayer | IVectorLayer | IStoryLayer
}) => {
  return (
    <li>
      <button>
        {layer.type === 'wmts' && <GlobeAltIcon className="h-5 w-5" />}
        {layer.type === 'vector' && <RectangleGroupIcon className="h-5 w-5" />}
        {layer.type === 'story' && <BookOpenIcon className="h-5 w-5" />}
        {layer.name}
      </button>
    </li>
  )
}

const LayerList = ({
  layers
}: {
  layers: (IWmtsLayer | IVectorLayer | IStoryLayer)[]
}) => {
  return (
    <div
      className={classNames({
        'w-[200px] h-fit max-h-[200px] calcite-box bg-base-100 overflow-auto pointer-events-auto':
          layers.length !== 0
      })}
    >
      <ul className="menu">
        {layers.map((layer) => (
          <LayerItem key={layer.id} layer={layer} />
        ))}
      </ul>
    </div>
  )
}

export default LayerList
