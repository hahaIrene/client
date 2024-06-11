import EsriSvgIcon from '@/components/EsriSvgIcon'
import { save16 } from '@esri/calcite-ui-icons'
import React from 'react'
import classNames from 'classnames'

interface IMapViewSetter {
  longitude: number
  latitude: number
  zoomLevel: number
  newLongitude: number
  newLatitude: number
  newZoomLevel: number
  isSaved: boolean
  onSave: (value: {
    longitude: number
    latitude: number
    zoomLevel: number
  }) => void
}

const MapViewSetter = ({
  longitude,
  latitude,
  zoomLevel,
  newLongitude,
  newLatitude,
  newZoomLevel,
  isSaved,
  onSave
}: IMapViewSetter) => {
  return (
    <div className="calcite-box flex justify-center items-center w-fit h-fit pointer-events-auto p-4 z-20 text-sm bg-white cursor-auto ">
      <div>
        <p>經度：{(Math.round(newLongitude * 1000) / 1000).toFixed(3)}</p>
        <p>緯度：{(Math.round(newLatitude * 1000) / 1000).toFixed(3)}</p>
        <p>縮放：{newZoomLevel}</p>
      </div>
      <div className="divider divider-horizontal"></div>
      <button
        onClick={() => {
          onSave({
            longitude: newLongitude,
            latitude: newLatitude,
            zoomLevel: newZoomLevel
          })
        }}
        className={classNames({
          'btn btn-neutral': true,
          'btn-disabled':
            (longitude === newLongitude &&
              latitude === newLatitude &&
              zoomLevel === newZoomLevel) ||
            isSaved
        })}
      >
        <EsriSvgIcon svg={save16} size={16} />
      </button>
    </div>
  )
}

export default MapViewSetter
