import React from 'react'
import LoadingScreen from '../widget/LoadingScreen'
import WidgetGrid from './WidgetGrid'

interface IMapLayout {
  isLoaded: boolean
  children: React.ReactNode
  topLeft?: JSX.Element[]
  topRight?: JSX.Element[]
  bottomLeft?: JSX.Element[]
  bottomRight?: JSX.Element[]
}

const MapLayout = ({
  isLoaded,
  children,
  topLeft = [],
  topRight = [],
  bottomLeft = [],
  bottomRight = []
}: IMapLayout) => {
  return (
    <>
      {!isLoaded && <div className="skeleton absolute top-0 left-0 w-full h-full"></div>}

      <WidgetGrid
        topLeft={topLeft}
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
      />
      {children}
    </>
  )
}

export default MapLayout
