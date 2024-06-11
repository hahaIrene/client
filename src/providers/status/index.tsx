import React, { createContext, useState } from 'react'

export type IStatus = 'loading' | 'success' | 'error' | 'warning' | 'none'

interface IStatusContext {
  status: IStatus
  message: string | undefined
  onStatusChange: (status: IStatus, message: string | undefined) => void
  onAlertClose: () => void
}

export const StatusContext = createContext<IStatusContext>({
  status: 'none',
  message: undefined,
  onStatusChange: () => {},
  onAlertClose: () => {}
})

const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setstatus] = useState<IStatus>('none')
  const [message, setmessage] = useState<string | undefined>(undefined)

  const onStatusChange = (status: IStatus, message: string | undefined) => {
    if (status === 'loading') {
      setmessage(undefined)
      setstatus(status)
      return
    }
    setmessage(message)
    setstatus(status)
  }

  const onAlertClose = () => {
    setmessage(undefined)
    setstatus('none')
  }

  return (
    <StatusContext.Provider
      value={{
        status,
        message,
        onStatusChange,
        onAlertClose
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}

export default StatusProvider
