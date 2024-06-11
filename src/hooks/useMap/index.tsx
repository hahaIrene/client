import { AppContext } from '@/containers/AppProvider'
import { sensorsLayerId } from '@/containers/HomeContainer/layers'
import {
  useLazyFindAllQuery,
  useLazyFindOneQuery,
  useLazyGetLatestHistoriesQuery
} from '@/stores/api/sensor'
import { useContext, useEffect, useRef, useState } from 'react'
import Basemap from '@arcgis/core/Basemap.js'
import Map from '@arcgis/core/Map'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import MapView from '@arcgis/core/views/MapView'
import View from '@arcgis/core/views/View.js'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'
import Compass from '@arcgis/core/widgets/Compass.js'
import Expand from '@arcgis/core/widgets/Expand.js'
import Legend from '@arcgis/core/widgets/Legend.js'
import Locate from '@arcgis/core/widgets/Locate.js'

// import esriConfig from '@arcgis/core/config'
// esriConfig.apiKey = 'AAPK7a564af3e78b413c89adcae13354e42bJ-ZHdv19-sspveCwprkRppRmExhV6qAdgOiUBh9ztWvrxfNfG-0w_1VKW7IthPGZ'

export type UseMapParams = {
  mapOption?: __esri.MapProperties
  mapViewOption?: Omit<__esri.MapViewProperties, 'map' | 'container'>
}

const defaultMapViewOption: UseMapParams['mapViewOption'] = {
  center: [121.00286, 23.738598],
  zoom: 7
}

class TaskStack<T> {
  stack: Array<(obg: T) => void>
  obj?: T
  constructor() {
    this.stack = []
  }

  addStack(callback: (obj: T) => void) {
    if (this.obj) return callback(this.obj)
    this.stack.push(callback)
  }

  setObject(obj: T) {
    if (this.obj) return
    this.obj = obj
    this.stack.forEach((task) => task(obj))
    this.stack = []
  }
}

const useMap = (
  elemRef: React.RefObject<HTMLDivElement>,
  { mapViewOption }: UseMapParams
) => {
  const mapRef = useRef<Map>()
  const mapViewRef = useRef<MapView>()
  const mapStack = useRef(new TaskStack<Map>())
  const mapViewStack = useRef(new TaskStack<MapView>())
  const [isLoaded, setisLoaded] = useState<boolean>(false)
  const asyncMap = new Promise<Map>((resolve) => {
    mapStack.current.addStack((map) => resolve(map))
  })
  const asyncMapView = new Promise<MapView>((resolve) => {
    mapViewStack.current.addStack((mapView) => resolve(mapView))
  })
  const highlightRef = useRef<{ remove: () => void } | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<MapView[]>([])
  const { onSelectSensor } = useContext(AppContext)

  const onSelect = (ids: string[]) => {
    setSelectedFeatures(selectedFeatures)
  }
  const handleFeatureClick = async (
    e: __esri.ViewClickEvent,
    layerView: __esri.GeoJSONLayerView | null
  ) => {
    const view = await asyncMapView
    const { results } = await view.hitTest(e)
    const layer = results.filter((r) => r.layer.id === sensorsLayerId).at(0)

    if (!layer) return
    if (layer.type !== 'graphic') return
    const { graphic } = layer
    const highlightFeature = await handleFeatureSelect(graphic, layerView)
    await handleFeatureHighlight(highlightFeature)
    const sensorID = highlightFeature?.attributes.sensorId as string
    onSelectSensor(sensorID)
  }

  const handleFeatureSelect = async (
    graphic: __esri.Graphic,
    layerView: __esri.GeoJSONLayerView | null
  ) => {
    if (graphic.getAttribute('sensorId')) {
      onSelect([graphic.getAttribute('sensorId')])
      return graphic
    } else {
      onSelect([])
      return undefined
    }
  }

  const handleFeatureHighlight = async (
    highlight: __esri.Graphic[] | __esri.Graphic | undefined
  ) => {
    if (highlightRef.current) highlightRef.current.remove()
    if (!highlight) return
    const map = await asyncMap
    const view = await asyncMapView
    const aprLayer = map.findLayerById(sensorsLayerId) as GeoJSONLayer
    const layerView = await view.whenLayerView(aprLayer)
    highlightRef.current = layerView.highlight(highlight)
  }

  useEffect(() => {
    if (!elemRef.current) return
    if (!mapStack.current.obj || !mapRef.current) {
      // const map = new Map(mapOption)
      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            id: '59548997ef4649aabe3b320a113d4097'
          }
        })
      })
      mapRef.current = map
      mapStack.current.setObject(map)
    }
    if (
      (!mapViewStack.current.obj || !mapViewRef.current) &&
      mapStack.current.obj
    ) {
      const mapView = new MapView({
        map: mapStack.current.obj,
        // ...defaultMapViewOption,
        ...mapViewOption,
        container: elemRef.current
      })
      const compass = new Compass({
        view: mapView
      })
      const legend = new Legend({
        view: mapView
      })
      const legendExpand = new Expand({
        expandIconClass: 'esri-icon-layer-list',
        view: mapView,
        content: legend
      })
      const locateWidget = new Locate({
        view: mapView
      })
      mapView.on('layerview-create', () => {
        setisLoaded(true)
      })

      mapView.ui = new DefaultUI()
      mapView.ui.add(compass, 'top-left')
      // mapView.ui.add(legend, 'bottom-right')
      mapView.ui.add(legendExpand, 'bottom-right')
      mapView.ui.add(locateWidget, 'top-right')
      mapViewRef.current = mapView
      mapViewStack.current.setObject(mapView)
      mapView.on('click', (event) => handleFeatureClick(event, null))
    }
  }, [elemRef.current])

  return {
    map: mapRef.current,
    mapView: mapViewRef.current,
    asyncMap,
    asyncMapView,
    isLoaded,
    selectedFeatures,
    handleFeatureClick
  }
}

export default useMap
