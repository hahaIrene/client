import UserRoleChip from '@/components/Table/OperationalTable/UserRoleChip'
import { useLazyUserFindAllQuery } from '@/stores/api/user'
import { IUser } from '@/stores/types/api/user'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'next-client-cookies'

const UsersInfo = ({ orgCode }: { orgCode: string | undefined }) => {
  const cookie = useCookies()
  const [users, setusers] = useState<IUser[]>([])
  const [findAll] = useLazyUserFindAllQuery()

  const getData = async () => {
    const token = cookie.get('token')
    if (!orgCode || !token) return
    const response = await findAll({ orgCode, access_token: token })
    if ('data' in response && response.data) {
      setusers(response.data)
    }
  }

  useEffect(() => {
    getData()
  }, [orgCode])

  return (
    <>
      {orgCode ? (
        <div className="w-full h-full bg-base-100 calcite-box">
          <div className="p-6 pb-0">
            <div className="text-xl">使用者總覽</div>
            <div className="divider"></div>
          </div>

          <ul className="menu bg-base-100 w-full rounded-none">
            {users.map((user, index) => {
              return (
                <li key={index}>
                  <a>
                    <div className="flex items-center space-x-2 gap-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          <span>{user.name.at(0)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg flex items-center gap-2">
                          {user.name}
                          <UserRoleChip user={user} />
                        </div>
                        <div className="text-sm text-neutral-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="skeleton w-full h-full"></div>
      )}
    </>
  )
}

export default UsersInfo
