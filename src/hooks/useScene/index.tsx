import { useEffect, useRef, useState } from 'react'
import Basemap from '@arcgis/core/Basemap.js'
import Map from '@arcgis/core/Map'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import SceneView from '@arcgis/core/views/SceneView.js'
import DefaultUI from '@arcgis/core/views/ui/DefaultUI'

// import esriConfig from '@arcgis/core/config'
// esriConfig.apiKey = 'AAPK7a564af3e78b413c89adcae13354e42bJ-ZHdv19-sspveCwprkRppRmExhV6qAdgOiUBh9ztWvrxfNfG-0w_1VKW7IthPGZ'

export type useSceneParams = {
  mapOption?: __esri.MapProperties
  sceneViewOption?: Omit<__esri.SceneViewProperties, 'map' | 'container'>
}

// const defaultSceneViewOption: useSceneParams['sceneViewOption'] = {
//   center: [121.00286, 23.738598],
//   zoom: 7
// }

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

const useScene = (
  elemRef: React.RefObject<HTMLDivElement>,
  { sceneViewOption }: useSceneParams
) => {
  const mapRef = useRef<Map>()
  const sceneViewRef = useRef<SceneView>()
  const mapStack = useRef(new TaskStack<Map>())
  const sceneViewStack = useRef(new TaskStack<SceneView>())
  const [isLoaded, setisLoaded] = useState<boolean>(false)
  const asyncMap = new Promise<Map>((resolve) => {
    mapStack.current.addStack((map) => resolve(map))
  })
  const asyncSceneView = new Promise<SceneView>((resolve) => {
    sceneViewStack.current.addStack((sceneView) => resolve(sceneView))
  })

  useEffect(() => {
    if (!elemRef.current) return
    if (!mapStack.current.obj || !mapRef.current) {
      const map = new Map({
        basemap: new Basemap({
          portalItem: {
            id: '358ec1e175ea41c3bf5c68f0da11ae2b'
          }
        }),
        ground: 'world-elevation'
      })
      mapRef.current = map
      mapStack.current.setObject(map)
    }
    if (
      (!sceneViewStack.current.obj || !sceneViewRef.current) &&
      mapStack.current.obj
    ) {
      const sceneView = new SceneView({
        map: mapStack.current.obj,
        // ...defaultSceneViewOption,
        ...sceneViewOption,
        container: elemRef.current
        // camera: {
        //   position: {
        //     x: 121.23, //Longitude
        //     y: 24.18, //Latitude
        //     z: 4662.2 //Meters
        //   },
        //   tilt: 79.3585
        // }
      })
      // @ts-ignore
      window.sceneView = sceneView
      sceneView.on('layerview-create', () => {
        setisLoaded(true)
      })
      sceneView.ui = new DefaultUI()
      sceneViewRef.current = sceneView
      sceneViewStack.current.setObject(sceneView)
    }
  }, [elemRef.current])

  return {
    map: mapRef.current,
    mapView: sceneViewRef.current,
    asyncMap,
    asyncSceneView,
    isLoaded
  }
}

export default useScene
