import useMap from '@/hooks/useMap'
import React, { useRef } from 'react'

const mapOptions = {
  mapOption: {
    basemap: 'arcgis-dark-gray'
  },
  mapViewOption: {
    center: [120.99286077330451, 23.73859883611335]
  }
}

const SettingMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const {} = useMap(mapRef, mapOptions)
  return <div ref={mapRef} className="w-full h-full cursor-pointer "></div>
}

export default SettingMap
