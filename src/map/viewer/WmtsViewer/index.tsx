import { IArcGisWmts } from '@/containers/layer/WmtsContainer/operator'
import useMap from '@/hooks/useMap'
import MapLayout from '@/map/layout'
import React, { useEffect, useRef } from 'react'
import WMTSLayer from '@arcgis/core/layers/WMTSLayer.js'

const mapOptions = {
  mapOption: {
    basemap: 'arcgis-dark-gray'
  },
  mapViewOption: {
    center: [120.99286077330451, 23.73859883611335]
  }
}

interface IWmtsViewerProps {
  wmtsSource: string
  isWmtsLoading: boolean
  selectedLayer: IArcGisWmts | undefined
  subLayer: string
  onSubLayersChange: (subLayers: IArcGisWmts[]) => void
  onIsWmtsLoadingChange: (isWmtsLoading: boolean) => void
  onIsWmtsSourceValidChange: (value: boolean) => void
  onIsSubLayerLoadingChange: (value: boolean) => void
}

// const wmtsUrl = 'https://wmts.nlsc.gov.tw/wmts'
// const wmtsUrl = 'https://gis.sinica.edu.tw/worldmap/wmts'

const WmtsViewer = ({
  wmtsSource,
  selectedLayer,
  subLayer,
  onSubLayersChange,
  onIsWmtsLoadingChange,
  onIsWmtsSourceValidChange,
  onIsSubLayerLoadingChange
}: IWmtsViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, isLoaded } = useMap(mapRef, mapOptions)

  const loadSubLayer2Map = async () => {
    let subLayerId = subLayer
    if (selectedLayer) {
      subLayerId = selectedLayer.id
    }
    onIsSubLayerLoadingChange(true)
    const map = await asyncMap
    map.removeAll()
    const wmtsLayer = new WMTSLayer({
      url: wmtsSource,
      activeLayer: { id: subLayerId }
    })
    await wmtsLayer.load()
    wmtsLayer.when(() => {
      map.add(wmtsLayer)
      onIsSubLayerLoadingChange(false)
    })
  }

  const loadWmtsService = async () => {
    if (wmtsSource === '') return
    onIsWmtsSourceValidChange(false)
    onIsWmtsLoadingChange(true)
    try {
      const wmtsLayer = new WMTSLayer({
        url: wmtsSource
      })
      await wmtsLayer.load()
      wmtsLayer.when(() => {
        const wmts: IArcGisWmts[] = []
        wmtsLayer.sublayers.forEach((sublayer) => {
          const s = { id: sublayer.id, title: sublayer.title }
          wmts.push(s)
        })
        onSubLayersChange(wmts)
        onIsWmtsLoadingChange(false)
        onIsWmtsSourceValidChange(true)
      })
    } catch (e) {
      console.log('wmts來源不正確')
      onIsWmtsSourceValidChange(false)
      onIsWmtsLoadingChange(false)
      onSubLayersChange([])
    }
  }

  useEffect(() => {
    loadWmtsService()
  }, [wmtsSource])

  useEffect(() => {
    loadSubLayer2Map()
  }, [selectedLayer, subLayer])

  return (
    <MapLayout isLoaded={isLoaded}>
      <div
        className="calcite-box pointer-events-auto cursor-pointer w-full h-full absolute top-0 left-0 z-0"
        ref={mapRef}
      ></div>
    </MapLayout>
  )
}

export default WmtsViewer
