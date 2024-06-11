import { useLazyHealthQuery } from '@/stores/api/app'
import { AppHealthQuery } from '@/stores/types/api/app'
import React, { createContext, useState } from 'react'

interface IAppContext {
  appHealth: AppHealthQuery['ResponseType'] | undefined
  onAppHealthChange: (param: AppHealthQuery['ParamType']) => void
}

export const AppContext = createContext<IAppContext>({
  appHealth: undefined,
  onAppHealthChange: () => {}
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appHealth, setappHealth] = useState<
    AppHealthQuery['ResponseType'] | undefined
  >(undefined)
  const [triggerHealth] = useLazyHealthQuery()

  const onAppHealthChange = async (param: AppHealthQuery['ParamType']) => {
    const response = await triggerHealth({ orgCode: param.orgCode })
    if ('data' in response) {
      setappHealth(response.data)
      return
    }
    if ('error' in response) {
      setappHealth(undefined)
    }
  }

  return (
    <AppContext.Provider value={{ appHealth, onAppHealthChange }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
