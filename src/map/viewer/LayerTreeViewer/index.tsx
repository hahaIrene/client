import useMap from '@/hooks/useMap'
import MapLayout from '@/map/layout'
import LayerList from '@/map/widget/LayerList'
import Status, { MapStatusType } from '@/map/widget/Status'
import { IStoryLayer } from '@/stores/types/api/story-layer'
import { IVectorLayer } from '@/stores/types/api/vector-layer'
import { IWmtsLayer } from '@/stores/types/api/wmts-layer'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'next-client-cookies'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import WMTSLayer from '@arcgis/core/layers/WMTSLayer.js'

const mapOptions = {
  mapOption: {
    basemap: 'arcgis-dark-gray'
  },
  mapViewOption: {
    center: [120.99286077330451, 23.73859883611335]
  }
}

interface ILayerTreeViewerProps {
  layers: (IWmtsLayer | IVectorLayer | IStoryLayer)[]
}

const LayerTreeViewer = ({ layers }: ILayerTreeViewerProps) => {
  const cookie = useCookies()
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, isLoaded } = useMap(mapRef, mapOptions)
  const [mapStatus, setmapStatus] = useState<MapStatusType>('none')
  const [statusMsg, setstatusMsg] = useState<string>('準備就緒')

  const loadWmtsLayer = async (layer: IWmtsLayer) => {
    setmapStatus('loading')
    setstatusMsg('載入圖層中')
    const map = await asyncMap
    const wmtsLayer = new WMTSLayer({
      url: layer.source,
      activeLayer: { id: layer.subLayer }
    })
    await wmtsLayer.load()
    wmtsLayer.when(async () => {
      map.add(wmtsLayer)
      setmapStatus('success')
      setstatusMsg('準備就緒')
    })
  }

  const loadVectorLayer = async (layer: IVectorLayer) => {
    setmapStatus('loading')
    setstatusMsg('載入圖層中')
    const orgCode = cookie.get('orgCode')
    if (!orgCode) return
    const map = await asyncMap
    const view = await asyncMapView

    const geoJsonLayer = new GeoJSONLayer({
      url: `${process.env.NEXT_PUBLIC_STATIC_SOURCE}/${orgCode}/vector-layer/${layer.filename}`
    })
    await geoJsonLayer.load()
    geoJsonLayer.when(async () => {
      map.add(geoJsonLayer)
      const extent = await geoJsonLayer.queryExtent()
      view.goTo(extent)
      setmapStatus('success')
      setstatusMsg('準備就緒')
    })
  }

  const loadStoryLayer = async (layer: IStoryLayer) => {
    setmapStatus('loading')
    setstatusMsg('載入圖層中')
    const orgCode = cookie.get('orgCode')
    if (!orgCode) return
    const map = await asyncMap
    const view = await asyncMapView

    const geoJsonLayer = new GeoJSONLayer({
      url: `${process.env.NEXT_PUBLIC_STATIC_SOURCE}/${orgCode}/story-layer/${layer.uri}.json`
    })
    await geoJsonLayer.load()
    geoJsonLayer.when(async () => {
      map.add(geoJsonLayer)
      const extent = await geoJsonLayer.queryExtent()
      view.goTo(extent)
      setmapStatus('success')
      setstatusMsg('準備就緒')
    })
  }

  const reloadLayers = async () => {
    if (!isLoaded) return
    const map = await asyncMap
    map.removeAll()
    layers.forEach(async (layer) => {
      switch (layer.type) {
        case 'wmts':
          await loadWmtsLayer(layer as IWmtsLayer)
          break
        case 'vector':
          await loadVectorLayer(layer as IVectorLayer)
          break
        case 'story':
          await loadStoryLayer(layer as IStoryLayer)
          break
      }
    })
  }

  useEffect(() => {
    reloadLayers()
  }, [layers])

  return (
    <MapLayout
      isLoaded={isLoaded}
      topRight={[<LayerList key="layer-list" layers={layers} />]}
      topLeft={
        isLoaded
          ? [<Status key="status" status={mapStatus} msg={statusMsg} />]
          : []
      }
    >
      <div
        className="calcite-box pointer-events-auto cursor-pointer w-full h-full absolute top-0 left-0 z-0"
        ref={mapRef}
      ></div>
    </MapLayout>
  )
}

export default LayerTreeViewer
