import useMap from '@/hooks/useMap'
import MapLayout from '@/map/layout'
import MapViewSetter from '@/map/widget/MapViewSetter'
import { StatusContext } from '@/providers/status'
import { useMapViewSettingsUpdateMutation } from '@/stores/api/map-view-settings'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'
import Point from '@arcgis/core/geometry/Point.js'

const mapOptions = {
  mapOption: {
    basemap: 'arcgis-dark-gray'
  },
  mapViewOption: {
    center: [120.99286077330451, 23.73859883611335]
  }
}

interface ISettingMap {
  longitude: number
  latitude: number
  zoomLevel: number
}

const SettingMap = ({ longitude, latitude, zoomLevel }: ISettingMap) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMapView, isLoaded } = useMap(mapRef, mapOptions)
  const [newLongitude, setlongitude] = useState<number>(longitude)
  const [newLatitude, setlatitude] = useState<number>(latitude)
  const [newZoomLevel, setzoomLevel] = useState<number>(zoomLevel)
  const [triggerSave] = useMapViewSettingsUpdateMutation()
  const { onStatusChange } = useContext(StatusContext)
  const [isSaved, setisSaved] = useState<boolean>(false)
  const cookie = useCookies()
  const router = useRouter()

  const onSave = async ({
    longitude,
    latitude,
    zoomLevel
  }: {
    longitude: number
    latitude: number
    zoomLevel: number
  }) => {
    const token = cookie.get('token')
    const orgCode = cookie.get('orgCode')
    if (!token || !orgCode) {
      router.push(`${orgCode}/login`)
      return
    }
    onStatusChange('loading', '儲存中')
    const response = await triggerSave({
      longitude,
      latitude,
      zoomLevel,
      orgCode,
      access_token: token
    })
    if ('data' in response) {
      onStatusChange('success', '儲存成功')
      setisSaved(true)
    } else {
      onStatusChange('error', '儲存失敗')
    }
  }

  const load = async () => {
    const view = await asyncMapView
    const point = new Point({ longitude, latitude })
    view.center = point
    view.zoom = zoomLevel
    view.on('drag', () => {
      setlongitude(view.center.longitude)
      setlatitude(view.center.latitude)
      setzoomLevel(view.zoom)
    })
  }

  useEffect(() => {
    setisSaved(
      !(
        longitude !== newLongitude ||
        latitude !== newLatitude ||
        zoomLevel !== newZoomLevel
      )
    )
  }, [newLongitude, newLatitude, newZoomLevel])

  useEffect(() => {
    load()
  }, [])

  return (
    <MapLayout
      isLoaded={isLoaded}
      topLeft={[
        <MapViewSetter
          key="map-view-setter"
          longitude={longitude}
          latitude={latitude}
          zoomLevel={zoomLevel}
          newLongitude={newLongitude}
          newLatitude={newLatitude}
          newZoomLevel={newZoomLevel}
          isSaved={isSaved}
          onSave={onSave}
        />
      ]}
      rounded={false}
    >
      <div
        className=" shadow-md pointer-events-auto cursor-pointer w-full h-full absolute top-0 left-0 z-0"
        ref={mapRef}
      ></div>
    </MapLayout>
  )
}

export default SettingMap
