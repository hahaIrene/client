import { IStoryLayer } from '@/stores/types/api/story-layer'
import { IVectorLayer } from '@/stores/types/api/vector-layer'
import { IWmtsLayer } from '@/stores/types/api/wmts-layer'
import {
  BookOpenIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/solid'
import React from 'react'
import classNames from 'classnames'

interface ILayerListProps {
  wmtsLayers: IWmtsLayer[] | undefined
  vectorLayers: IVectorLayer[] | undefined
  storyLayers: IStoryLayer[] | undefined
  selectedLayers: (IWmtsLayer | IVectorLayer | IStoryLayer)[]
  onSelect: (selected: (IWmtsLayer | IVectorLayer | IStoryLayer)[]) => void
}

interface ILayerListForLayerTreeProps {
  wmtsLayers: IWmtsLayer[] | undefined
  vectorLayers: IVectorLayer[] | undefined
  storyLayers: IStoryLayer[] | undefined
  selectedLayer: IWmtsLayer | IVectorLayer | IStoryLayer | undefined
  onSelect: (selected: IWmtsLayer | IVectorLayer | IStoryLayer) => void
}

const LayerList = ({
  wmtsLayers,
  vectorLayers,
  storyLayers,
  selectedLayers,
  onSelect
}: ILayerListProps) => {
  const handleSelect = (selected: IWmtsLayer | IVectorLayer | IStoryLayer) => {
    const isLayerAlreadySelected = selectedLayers.some(
      (layer) => layer.id === selected.id
    )
    if (isLayerAlreadySelected) {
      onSelect(selectedLayers.filter((layer) => layer.id !== selected.id))
      return
    }
    onSelect([...selectedLayers, selected])
  }

  return (
    <div className="w-full h-full calcite-box overflow-auto">
      {!wmtsLayers || !vectorLayers || !storyLayers ? (
        <div className="skeleton w-full h-full rounded-none"></div>
      ) : (
        <ul className="menu bg-base-100 w-full rounded-md">
          <li>
            <details>
              <summary>
                <GlobeAltIcon className="h-5 w-5" />
                WMTS圖層
              </summary>
              <ul>
                {wmtsLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayers.some(
                          (selected) => selected.id === layer.id
                        )
                      })}
                    >
                      <div className="flex gap-2">
                        <GlobeAltIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayers.some(
                        (selected) => selected.id === layer.id
                      ) ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                <RectangleGroupIcon className="h-5 w-5" />
                向量圖層
              </summary>
              <ul>
                {vectorLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayers.some(
                          (selected) => selected.id === layer.id
                        )
                      })}
                    >
                      <div className="flex gap-2">
                        <RectangleGroupIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayers.some(
                        (selected) => selected.id === layer.id
                      ) ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                <BookOpenIcon className="h-5 w-5" />
                故事地圖
              </summary>
              <ul>
                {storyLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayers.some(
                          (selected) => selected.id === layer.id
                        )
                      })}
                    >
                      <div className="flex gap-2">
                        <BookOpenIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayers.some(
                        (selected) => selected.id === layer.id
                      ) ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      )}
    </div>
  )
}

export const LayerListSingle = ({
  wmtsLayers,
  vectorLayers,
  storyLayers,
  selectedLayer,
  onSelect
}: ILayerListForLayerTreeProps) => {
  const handleSelect = (selected: IWmtsLayer | IVectorLayer | IStoryLayer) => {
    onSelect(selected)
  }

  return (
    <div className="w-full h-full calcite-box">
      {!wmtsLayers || !vectorLayers || !storyLayers ? (
        <div className="skeleton w-full h-full rounded-none"></div>
      ) : (
        <ul className="menu bg-base-100 w-full rounded-md overflow-auto">
          <li>
            <details>
              <summary>
                <GlobeAltIcon className="h-5 w-5" />
                WMTS圖層
              </summary>
              <ul>
                {wmtsLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayer?.id === layer.id
                      })}
                    >
                      <div className="flex gap-2">
                        <GlobeAltIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayer?.id === layer.id ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                <RectangleGroupIcon className="h-5 w-5" />
                向量圖層
              </summary>
              <ul>
                {vectorLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayer?.id === layer.id
                      })}
                    >
                      <div className="flex gap-2">
                        <RectangleGroupIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayer?.id === layer.id ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary>
                <BookOpenIcon className="h-5 w-5" />
                故事地圖
              </summary>
              <ul>
                {storyLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => {
                      handleSelect(layer)
                    }}
                  >
                    <button
                      className={classNames({
                        'flex justify-between': true,
                        ['active']: selectedLayer?.id === layer.id
                      })}
                    >
                      <div className="flex gap-2">
                        <BookOpenIcon className="h-5 w-5" />
                        {layer.name}
                      </div>
                      {selectedLayer?.id === layer.id ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      )}
    </div>
  )
}

export default LayerList
