import React from 'react'

interface IEsriSvgIcon {
  size: number
  svg: string
}

const EsriSvgIcon = ({ size, svg }: IEsriSvgIcon) => {
  return (
    <span>
      <svg
        className="fill-current"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <path d={svg} />
      </svg>
    </span>
  )
}

export default EsriSvgIcon
