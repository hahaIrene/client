import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

export type MapStatusType = 'loading' | 'success' | 'error' | 'warning' | 'none'

const Status = ({ status, msg }: { status: MapStatusType; msg: string }) => {
  return (
    <div className="z-40 px-2 calcite-box flex items-center justify-between gap-2 h-[32px] w-fit rounded-full bg-base-100">
      {(status === 'none' || status === 'success') && (
        <CheckCircleIcon className="w-5 h-5 text-green-400" />
      )}
      {status === 'loading' && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      <span className="text-xs text-base-content">{msg}</span>
    </div>
  )
}

export default Status
