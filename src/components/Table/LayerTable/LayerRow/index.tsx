import { WmtsOperatorMode } from '@/containers/layer/WmtsContainer/provider'
import { LayerType } from '@/stores/types/api/layer'
import {
  PencilSquareIcon,
  TrashIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid'
import React from 'react'
import moment from 'moment'
import LayerChip from '../LayerChip'

function timeDifference(updatedAt: string) {
  const now = moment()
  const update = moment.utc(updatedAt)
  const diffSeconds = Math.abs(now.diff(update, 'seconds'))
  if (diffSeconds < 10) {
    return `${diffSeconds} 秒之前`
  } else if (diffSeconds < 60) {
    return `${diffSeconds} 秒之前`
  } else if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)} 分鐘之前`
  } else if (diffSeconds < 86400) {
    return `${Math.floor(diffSeconds / 3600)} 小時之前`
  } else {
    return update.add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
  }
}

interface LayerRowProps {
  id: string
  type: LayerType
  name: string
  updatedAt: string
  onLayerEdit: () => void
  onLayerDelete: () => void
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: WmtsOperatorMode) => void
  onEditingIdChange: (id: string) => void
}

const LayerRow = ({
  id,
  type,
  name,
  updatedAt,
  onOperatorSwitch,
  onOperatorModeChange,
  onLayerDelete,
  onEditingIdChange
}: LayerRowProps) => {
  return (
    <tr className="select-none hover:bg-neutral hover:bg-opacity-10">
      <td>
        <div className=" font-bold text-sm lg:text-base">{name}</div>
      </td>
      <td>
        <LayerChip type={type} />
      </td>
      <td>{timeDifference(updatedAt)}</td>
      <td>
        <div className="dropdown dropdown-left">
          <div tabIndex={0} role="button" className="btn btn-sm ml-1">
            <WrenchScrewdriverIcon className="w-4 h-4" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                onClick={() => {
                  onOperatorSwitch(true)
                  onOperatorModeChange('edit')
                  onEditingIdChange(id)
                }}
              >
                <PencilSquareIcon className="w-5 h-5" />
                編輯
              </a>
            </li>
            <li>
              <a onClick={onLayerDelete}>
                <TrashIcon className="w-5 h-5" />
                刪除
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  )
}

export default LayerRow
