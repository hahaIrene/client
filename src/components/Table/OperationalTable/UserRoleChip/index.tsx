import { IUser } from '@/stores/types/api/user'
import React from 'react'
import classNames from 'classnames'

const UserRoleChip = ({ user }: { user: IUser }) => {
  return (
    <span
      className={classNames({
        'text-sm inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ':
          true,
        'ring-yellow-600/20 text-yellow-800 bg-yellow-50':
          user.isRoot && user.isAdmin,
        'ring-blue-700/10 text-blue-700 bg-blue-50':
          !user.isRoot && user.isAdmin,
        'ring-green-600/20 text-green-700 bg-green-50': !user.isAdmin
      })}
    >
      {user.isAdmin
        ? user.isRoot
          ? '超級管理員'
          : '組織管理員'
        : '普通使用者'}
    </span>
  )
}

export default UserRoleChip
