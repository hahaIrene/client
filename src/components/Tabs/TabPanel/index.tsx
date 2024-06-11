import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabContext } from '..'

interface ITabPanel {
  value: number
  children: React.ReactNode
}

const TabPanel = ({ value, children }: ITabPanel) => {
  const { tab } = useContext(TabContext)
  return (
    <div
      className={classNames({
        'w-full min-h-[300px] h-fit border-[2px] border-primary rounded-md p-6':
          true,
        hidden: tab !== value
      })}
    >
      {children}
    </div>
  )
}

export default TabPanel
