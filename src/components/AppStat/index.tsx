'use client'

import LoadingScreen from '@/map/widget/LoadingScreen'
import { useLazyHealthQuery } from '@/stores/api/app'
import { useLazyStoryLayerFindAllQuery } from '@/stores/api/story-layer'
import { useLazyVectorLayerFindAllQuery } from '@/stores/api/vector-layer'
import { useLazyWmtsFindAllQuery } from '@/stores/api/wmts'
import { IAppInfo } from '@/stores/types/api/app'
import { IStoryLayer } from '@/stores/types/api/story-layer'
import { IVectorLayer } from '@/stores/types/api/vector-layer'
import { IWmtsLayer } from '@/stores/types/api/wmts-layer'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import LayerList from '../LayerList'
import AppBasicInfo from './AppBasicInfo'
import UsersInfo from './UsersInfo'

const MapViewer = dynamic(() => import('../../map/viewer/LayerTreeViewer'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

const AppStat = ({ orgCode }: { orgCode: string | undefined }) => {
  const [appHealth, setappHealth] = useState<IAppInfo | undefined>(undefined)
  const [wmtsLayers, setwmtsLayers] = useState<IWmtsLayer[] | undefined>(
    undefined
  )
  const [vectorLayers, setvectorLayers] = useState<IVectorLayer[] | undefined>(
    undefined
  )
  const [storyLayers, setstoryLayers] = useState<IStoryLayer[] | undefined>(
    undefined
  )
  const [selectedLayers, setselectedLayers] = useState<
    (IWmtsLayer | IVectorLayer | IStoryLayer)[]
  >([])

  const [getHealth] = useLazyHealthQuery()
  const [findAllWmts] = useLazyWmtsFindAllQuery()
  const [findAllStorys] = useLazyStoryLayerFindAllQuery()
  const [findAllVectors] = useLazyVectorLayerFindAllQuery()

  const getData = async () => {
    if (!orgCode) return
    const response = await getHealth({ orgCode })
    if ('data' in response && response.data) {
      setappHealth(response.data)
    }
    const responseWmts = await findAllWmts({ orgCode })
    if ('data' in responseWmts && responseWmts.data) {
      setwmtsLayers(responseWmts.data.map((w) => ({ ...w, type: 'wmts' })))
    }
    const responseStorys = await findAllStorys({ orgCode })
    if ('data' in responseStorys && responseStorys.data) {
      setstoryLayers(responseStorys.data.map((w) => ({ ...w, type: 'story' })))
    }
    const responseVectors = await findAllVectors({ orgCode })
    if ('data' in responseVectors && responseVectors.data) {
      setvectorLayers(
        responseVectors.data.map((w) => ({ ...w, type: 'vector' }))
      )
    }
  }

  useEffect(() => {
    getData()
  }, [orgCode])

  return (
    <div className="w-full h-fit">
      <AppBasicInfo appHealth={appHealth} />
      <div className="divider"></div>
      <div className="w-full h-[500px] flex gap-4 relative">
        <div className=" w-[50%] h-full relative">
          <LayerList
            wmtsLayers={wmtsLayers}
            vectorLayers={vectorLayers}
            storyLayers={storyLayers}
            selectedLayers={selectedLayers}
            onSelect={(layers) => {
              setselectedLayers(layers)
            }}
          />
        </div>
        <div className=" w-[50%] h-full relative">
          <MapViewer layers={selectedLayers} />
        </div>
      </div>
      <div className="divider"></div>
      <div className="w-full h-[500px] relative">
        <UsersInfo orgCode={orgCode} />
      </div>
    </div>
  )
}

export default AppStat
