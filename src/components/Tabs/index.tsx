import React, { createContext } from 'react'

interface ITabs {
  tab: number
  onChange: (tab: number) => void
  children: React.ReactNode
}

export const TabContext = createContext<ITabs>({
  tab: 0,
  onChange: () => {},
  children: <></>
})

const Tabs = ({ tab, children, onChange }: ITabs) => {
  return (
    <TabContext.Provider
      value={{
        tab,
        children,
        onChange
      }}
    >
      <div>
        <div className="tabs tabs-boxed flex gap-1">{children}</div>
      </div>
    </TabContext.Provider>
  )
}

export default Tabs
