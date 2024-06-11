import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import classNames from 'classnames'
import EntityRow from './EntityRow'

export type OperatorMode = 'create' | 'edit'

export interface IEntity {
  id: string
  name: string
  updatedAt: string
  typeChip: JSX.Element
}

const Table = ({
  entities,
  onEntityDelete,
  onOperatorSwitch,
  onOperatorModeChange,
  onEditingIdChange,
  onEntityView
}: {
  entities: IEntity[]
  onEntityDelete: (id: string, name: string) => void
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: OperatorMode) => void
  onEditingIdChange: (id: string) => void
  onEntityView: (id: string) => void
}) => {
  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>名稱</th>
          <th>類別</th>
          <th>上次更新於</th>
          <th></th>
        </tr>
      </thead>
    )
  }

  const TableBody = () => {
    return (
      <tbody>
        {entities.map((entity, index) => (
          <EntityRow
            key={index}
            id={entity.id}
            name={entity.name}
            updatedAt={entity.updatedAt}
            onEntityDelete={() => {
              onEntityDelete(entity.id, entity.name)
            }}
            typeChip={entity.typeChip}
            onOperatorSwitch={onOperatorSwitch}
            onOperatorModeChange={onOperatorModeChange}
            onEditingIdChange={onEditingIdChange}
            onEntityView={onEntityView}
          />
        ))}
      </tbody>
    )
  }

  const EmptyState = () => {
    return (
      <div className="absolute top-[80px] z-0 w-full h-[calc(100dvh-196px)] ">
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl text-neutral-400">尚無資料</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {entities.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="table bg-base-100 rounded-none absolute top-[80px] z-0">
          <TableHead />
          <TableBody />
        </table>
      )}
    </>
  )
}

const OperationalTable = ({
  entities,
  isEntitiesLoaded,
  isOperatorOpen,
  operator,
  countLimit,
  onOperatorSwitch,
  onOperatorModeChange,
  onEntityDelete,
  onEntityView,
  onEditingIdChange
}: {
  entities: IEntity[]
  isEntitiesLoaded: boolean
  isOperatorOpen: boolean
  operator: JSX.Element
  countLimit: number | null | undefined
  onOperatorSwitch: (isOpen: boolean) => void
  onOperatorModeChange: (mode: OperatorMode) => void
  onEntityDelete: (id: string, name: string) => void
  onEntityView: (id: string) => void
  onEditingIdChange: (id: string | undefined) => void
}) => {
  return (
    <div className="overflow-auto h-full w-full absolute">
      <div className="fixed w-full lg:w-[calc(100vw-288px)] h-[80px]  bg-base-100 z-10 shadow p-4 flex justify-between">
        <div className="flex items-center gap-4 select-none">
          <button
            className={classNames({
              'btn btn-neutral': true,
              'btn-disabled': countLimit && entities.length >= countLimit
            })}
            onClick={() => {
              onOperatorModeChange('create')
              onOperatorSwitch(true)
              onEditingIdChange(undefined)
            }}
          >
            <PlusCircleIcon className="w-5 h-5" />
            新增
          </button>
          {/* {layerLimit === null ? (
            <p className="font-bold">Pro版本無圖層限制！</p>
          ) : entities.length >= layerLimit ? (
            <p className="font-bold text-red-500">{`圖層已達當前方案上限！`}</p>
          ) : (
            <p className="font-bold">{`已使用${entities.length}個圖層，剩餘${layerLimit - layers.length}個`}</p>
          )} */}
        </div>
      </div>
      {isEntitiesLoaded ? (
        <>
          {isOperatorOpen ? (
            operator
          ) : (
            <Table
              entities={entities}
              onEntityDelete={onEntityDelete}
              onOperatorSwitch={onOperatorSwitch}
              onOperatorModeChange={onOperatorModeChange}
              onEditingIdChange={onEditingIdChange}
              onEntityView={onEntityView}
            />
          )}
        </>
      ) : (
        <div className="skeleton w-full h-full"></div>
      )}
    </div>
  )
}

export default OperationalTable
