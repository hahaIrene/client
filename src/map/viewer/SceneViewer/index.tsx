import useScene from '@/hooks/useScene'
import MapLayout from '@/map/layout'
import React, { useRef } from 'react'

const mapOptions = {
  // mapOption: {
  //   basemap: 'arcgis-dark-gray'
  // },
  // mapViewOption: {
  //   center: [120.99286077330451, 23.73859883611335]
  // }
}
const SceneViewer = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { isLoaded } = useScene(mapRef, mapOptions)

  return (
    <MapLayout isLoaded={isLoaded}>
      <div
        className="calcite-box pointer-events-auto cursor-pointer w-full h-full absolute top-0 left-0 z-0"
        ref={mapRef}
      ></div>
    </MapLayout>
  )
}

export default SceneViewer
