import React from 'react'

interface IWidgetGrid {
  topLeft?: JSX.Element[]
  topRight?: JSX.Element[]
  bottomLeft?: JSX.Element[]
  bottomRight?: JSX.Element[]
}

const WidgetGrid = ({
  topLeft = [],
  topRight = [],
  bottomLeft = [],
  bottomRight = []
}: IWidgetGrid) => {
  return (
    <div className=" pointer-events-none w-full h-full rounded-md absolute top-0 left-0 z-10 grid grid-cols-2 grid-rows-2 gap-10">
      <div className="p-4 flex items-start gap-2">{topLeft}</div>
      <div className="p-4 flex justify-end items-start gap-2">{topRight}</div>
      <div className="p-4 flex items-end gap-2">{bottomLeft}</div>
      <div className="p-4 flex justify-end items-end gap-2">{bottomRight}</div>
    </div>
  )
}

export default WidgetGrid
