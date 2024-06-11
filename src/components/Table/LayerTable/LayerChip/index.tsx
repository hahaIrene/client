import { LayerType, LayerTypeMap } from '@/stores/types/api/layer'
import React from 'react'
import classNames from 'classnames'

interface LayerChipProps {
  type: LayerType
}

const LayerChip = ({ type }: LayerChipProps) => {
  return (
    <div
      className={classNames({
        'w-fit h-fit text-white text-xs rounded-xl py-1 px-2 border border-neutral-400':
          true,
        'bg-gray-600': type === 'wmts',
        'bg-orange-600': type === 'story',
        'bg-blue-600': type === 'vector'
      })}
    >
      {LayerTypeMap[type].title}
    </div>
  )
}

export default LayerChip
