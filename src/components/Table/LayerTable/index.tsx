import { WmtsOperatorMode } from '@/containers/layer/WmtsContainer/provider'
import ILayer from '@/stores/types/api/layer'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import classNames from 'classnames'
import LayerRow from './LayerRow'

const Table = ({
  layers,
  onLayerDelete,
  onOperatorSwitch,
  onOperatorModeChange,
  onEditingIdChange
}: {
  layers: ILayer[]
  onLayerDelete: (id: string, name: string) => void
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: WmtsOperatorMode) => void
  onEditingIdChange: (id: string) => void
}) => {
  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>圖層名稱</th>
          <th>圖層類別</th>
          <th>上次更新於</th>
          <th></th>
        </tr>
      </thead>
    )
  }

  const TableBody = () => {
    return (
      <tbody>
        {layers.map((layer, index) => (
          <LayerRow
            id={layer.id}
            key={index}
            type={layer.type}
            name={layer.name}
            updatedAt={layer.updatedAt}
            onLayerDelete={() => {
              onLayerDelete(layer.id, layer.name)
            }}
            onLayerEdit={() => {}}
            onOperatorSwitch={onOperatorSwitch}
            onOperatorModeChange={onOperatorModeChange}
            onEditingIdChange={onEditingIdChange}
          />
        ))}
      </tbody>
    )
  }

  const EmptyState = () => {
    return (
      <div className="absolute top-[80px] z-0 w-full h-[calc(100dvh-196px)] ">
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl text-neutral-400">尚無圖層</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {layers.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="table rounded-none bg-base-100 absolute top-[80px] z-0">
          <TableHead />
          <TableBody />
        </table>
      )}
    </>
  )
}

const LayerTable = ({
  layers,
  isLayersLoaded,
  isOperatorOpen,
  operator,
  layerLimit,
  onOperatorSwitch,
  onOperatorModeChange,
  onLayerDelete,
  onEditingIdChange
}: {
  layers: ILayer[]
  isLayersLoaded: boolean
  isOperatorOpen: boolean
  operator: JSX.Element
  layerLimit: number | null
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: WmtsOperatorMode) => void
  onLayerDelete: (id: string, name: string) => void
  onEditingIdChange: (id: string | undefined) => void
}) => {
  return (
    <div className="overflow-auto h-full w-full absolute">
      <div className="fixed w-full lg:w-[calc(100vw-288px)] h-[80px]  bg-base-100 z-10 shadow p-4 flex justify-between">
        <div className="flex items-center gap-4 select-none">
          <button
            className={classNames({
              'btn btn-neutral': true,
              'btn-disabled': layerLimit && layers.length >= layerLimit
            })}
            onClick={() => {
              onOperatorModeChange('create')
              onOperatorSwitch(true)
              onEditingIdChange(undefined)
            }}
          >
            <PlusCircleIcon className="w-5 h-5" />
            新增圖層
          </button>
          {layerLimit === null ? (
            <p className="font-bold">Pro版本無圖層限制！</p>
          ) : layers.length >= layerLimit ? (
            <p className="font-bold text-red-500">{`圖層已達當前方案上限！`}</p>
          ) : (
            <p className="font-bold">{`已使用${layers.length}個圖層，剩餘${layerLimit - layers.length}個`}</p>
          )}
        </div>
      </div>
      {isLayersLoaded ? (
        <>
          {isOperatorOpen ? (
            operator
          ) : (
            <Table
              layers={layers}
              onLayerDelete={onLayerDelete}
              onOperatorSwitch={onOperatorSwitch}
              onOperatorModeChange={onOperatorModeChange}
              onEditingIdChange={onEditingIdChange}
            />
          )}
        </>
      ) : (
        <div className="skeleton w-full h-full"></div>
      )}
    </div>
  )
}

export default LayerTable
