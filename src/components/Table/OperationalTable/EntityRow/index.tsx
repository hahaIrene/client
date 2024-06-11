import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/solid'
import React from 'react'
import moment from 'moment'
import { OperatorMode } from '..'

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

interface EntityRowProps {
  id: string
  name: string
  updatedAt: string
  typeChip: JSX.Element
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: OperatorMode) => void
  onEditingIdChange: (id: string) => void
  onEntityDelete: () => void
  onEntityView: (id: string) => void
}

const EntityRow = ({
  id,
  name,
  updatedAt,
  typeChip,
  onOperatorSwitch,
  onOperatorModeChange,
  onEditingIdChange,
  onEntityDelete,
  onEntityView
}: EntityRowProps) => {
  return (
    <tr className="select-none hover:bg-neutral hover:bg-opacity-10">
      <td>
        <div className=" font-bold text-sm lg:text-base">{name}</div>
      </td>
      <td className="text-sm #{!important}">{typeChip}</td>
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
                  onEntityView(id)
                }}
              >
                <EyeIcon className="w-5 h-5" />
                檢視
              </a>
            </li>

            <div className="divider my-0 before:h-[0.05rem] after:h-[0.05rem]"></div>
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
              <a onClick={onEntityDelete}>
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

export default EntityRow
