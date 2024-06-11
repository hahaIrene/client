import { IUserPayload } from '@/providers/auth'
import React from 'react'

const Welcome = ({ user }: { user: IUserPayload | undefined }) => {
  return (
    <>
      {user ? (
        <div className="w-full">
          <p className="text-2xl">歡迎回來,</p>
          <p>{user.email}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pt-2">
          <div className="skeleton h-6 w-28"></div>
          <div className="skeleton h-4 w-48"></div>
        </div>
      )}
    </>
  )
}

export default Welcome
