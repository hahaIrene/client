import React from 'react'
import classNames from 'classnames'

interface ILinearGaugeProps {
  value: number
  max: number
}

const GuageUnit = ({
  isActivated,
  isMaxed
}: {
  isActivated: boolean
  isMaxed: boolean
}) => {
  return (
    <div
      className={classNames({
        'h-full w-full rounded-md': true,
        ' bg-green-400': isActivated,
        ' bg-gray-300': !isActivated,
        ' bg-red-400': isActivated && isMaxed
      })}
    ></div>
  )
}

const LinearGauge = ({ value, max }: ILinearGaugeProps) => {
  const isMaxed = value >= max
  return (
    <div className="w-full h-full py-1 flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        return (
          <GuageUnit
            key={index}
            isActivated={index < value}
            isMaxed={isMaxed}
          />
        )
      })}
    </div>
  )
}

export default LinearGauge
