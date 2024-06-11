import { SymbolBuilderContext } from '@/components/Symbology/provider'
import useMap from '@/hooks/useMap'
import MapLayout from '@/map/layout'
import React, { useContext, useEffect, useRef } from 'react'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import Renderer from '@arcgis/core/renderers/Renderer.js'
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js'

const mapOptions = {
  mapOption: {
    basemap: 'arcgis-dark-gray'
  },
  mapViewOption: {
    center: [120.99286077330451, 23.73859883611335]
  }
}

interface IGeoJsonViewerProps {
  geoJsonSource: string
  isGeoJsonLoading: boolean
  onIsGeoJsonLoadingChange: (isGeoJsonLoading: boolean) => void
  onIsGeoJsonSourceValidChange: (value: boolean) => void
}

// const tgosUri = 'https://www.tgos.tw/MapSites/getGeoJson?themeid=39576'
// const tgosUri = 'https://map.jsdc.com.tw/tools/tgosGeoJson.php?themeid=39576'

const GeoJsonViewer = ({
  geoJsonSource,
  onIsGeoJsonLoadingChange,
  onIsGeoJsonSourceValidChange
}: IGeoJsonViewerProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { asyncMap, asyncMapView, isLoaded } = useMap(mapRef, mapOptions)
  const { layerStyle, rendererType } = useContext(SymbolBuilderContext)

  const reloadStyleToLayer = async (renderer: Renderer) => {
    const map = await asyncMap
    map.findLayerById('geoJsonLayer')?.set('renderer', renderer)
  }

  const buildRenderer = () => {
    let renderer = undefined
    if (rendererType === 'simple' && layerStyle) {
      renderer = SimpleRenderer.fromJSON(JSON.parse(layerStyle))
      return renderer
    }
    return renderer
  }

  const loadGeoJson2Map = async () => {
    if (!geoJsonSource) return
    onIsGeoJsonSourceValidChange(false)
    onIsGeoJsonLoadingChange(true)
    try {
      const map = await asyncMap
      map.removeAll()
      const view = await asyncMapView
      const geoJsonLayer = new GeoJSONLayer({
        id: 'geoJsonLayer',
        url: geoJsonSource
      })
      await geoJsonLayer.load()
      geoJsonLayer.when(async () => {
        const renderer = buildRenderer()
        if (renderer) geoJsonLayer.renderer = renderer
        map.add(geoJsonLayer)
        const extent = await geoJsonLayer.queryExtent()
        view.goTo(extent)
        extent.extent
          ? onIsGeoJsonSourceValidChange(true)
          : onIsGeoJsonSourceValidChange(false)
        onIsGeoJsonLoadingChange(false)
        // if (extent.extent) {
        //   onIsGeoJsonSourceValidChange(true)
        //   onIsGeoJsonLoadingChange(false)
        // } else {
        //   onIsGeoJsonSourceValidChange(false)
        // }
      })
    } catch (error) {
      onIsGeoJsonSourceValidChange(false)
      onIsGeoJsonLoadingChange(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      const renderer = buildRenderer()
      if (!renderer) return
      reloadStyleToLayer(renderer)
    })()
  }, [layerStyle])

  useEffect(() => {
    if (isLoaded && geoJsonSource) {
      loadGeoJson2Map()
    }
  }, [isLoaded, geoJsonSource])

  return (
    <MapLayout isLoaded={isLoaded}>
      <div
        ref={mapRef}
        className="calcite-box pointer-events-auto cursor-pointer w-full h-full absolute top-0 left-0 z-0"
      />
    </MapLayout>
  )
}

export default GeoJsonViewer
