import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabContext } from '..'

interface ITabLabel {
  value: number
  children: React.ReactNode
}

const TabLabel = ({ value, children }: ITabLabel) => {
  const { tab, onChange } = useContext(TabContext)
  return (
    <a
      className={classNames({
        'tab flex-auto': true,
        'tab-active': tab === value
      })}
      onClick={() => {
        onChange(value)
      }}
    >
      {children}
    </a>
  )
}

export default TabLabel
