'use client'

import useMap from '@/hooks/useMap'
import useScene from '@/hooks/useScene'
import MapLayout from '@/map/layout'
import {
  useLazyFindAllQuery,
  useLazyGetLatestHistoriesQuery
} from '@/stores/api/sensor'
import React, { useEffect, useRef, useState } from 'react'
import AppProvider from '../AppProvider'
import Info from './Info'
import { generateSensorsLayer } from './layers'

export default function HomeContainer() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, isLoaded, mapView, selectedFeatures } = useMap(mapRef, {
    mapViewOption: {
      zoom: 7,
      center: [121, 23.7]
    }
  })
  // const [triggerFindAll] = useLazyFindAllQuery()
  const [triggerLatestHistories] = useLazyGetLatestHistoriesQuery()
  const [isDataLoaded, setisDataLoaded] = useState<boolean>(false)

  const loadSensorData = async () => {
    const response = await triggerLatestHistories(null)
    const map = await asyncMap
    if ('data' in response && response.data) {
      const { sensorsLayer } = generateSensorsLayer(response.data)
      map.add(sensorsLayer)
      setisDataLoaded(true)
    }
  }

  useEffect(() => {
    loadSensorData()
  }, [])

  return (
    <main>
      <Info />
      <div className="relative w-[60dvw] h-[80dvh] calcite-box">
        <MapLayout isLoaded={isDataLoaded && isLoaded}>
          <div
            className="w-full h-full absolute top-0 left-0"
            ref={mapRef}
          ></div>
        </MapLayout>
      </div>
    </main>
  )
}
