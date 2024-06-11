import React, { createContext, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'

interface IOrgContext {
  orgCode: string | undefined
}

export const OrgContext = createContext<IOrgContext>({
  orgCode: undefined
})

const OrgProvider = ({
  orgCode,
  children
}: {
  orgCode: string
  children: React.ReactNode
}) => {
  const cookie = useCookies()

  useEffect(() => {
    if (orgCode) cookie.set('orgCode', orgCode)
  }, [])

  return (
    <OrgContext.Provider value={{ orgCode }}>{children}</OrgContext.Provider>
  )
}

export default OrgProvider
