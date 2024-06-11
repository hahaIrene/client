import React, { useState } from 'react'
import PictureMarkerSymbolBuilder from '../../SymbolBuilders/PictureMarkerSymbolBuilder'
import SimpleFillSymbolBuilder from '../../SymbolBuilders/SimpleFillSymbolBuilder'
import SimpleLineSymbolBuilder from '../../SymbolBuilders/SimpleLineSymbolBuilder'
import SimpleMarkerSymbolBuilder from '../../SymbolBuilders/SimpleMarkerSymbolBuilder'
import { GeometryType } from '../../provider'

interface ISimpleRenderersProps {
  geometryType: Exclude<GeometryType, undefined>
  layerStyle: string | undefined
  onChange: (value: string) => void
}

interface IMarkerSymbolBuilderProps {
  value: string | undefined
  onChange: (value: string) => void
}

const MarkerSymbolBuilder = ({
  value,
  onChange
}: IMarkerSymbolBuilderProps) => {
  const [markerType, setmarkerType] = useState<'simple' | 'picture'>('simple')
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">type</span>
        </div>
        <select
          className="select select-sm select-bordered"
          value={markerType}
          onChange={(e) =>
            setmarkerType(e.target.value as 'simple' | 'picture')
          }
        >
          <option value={'simple'}>simple</option>
          <option value={'picture'} disabled>
            picture (尚未開放)
          </option>
        </select>
      </label>
      {markerType === 'simple' && (
        <SimpleMarkerSymbolBuilder value={value} onChange={onChange} />
      )}
      {markerType === 'picture' && (
        <PictureMarkerSymbolBuilder value={value} onChange={onChange} />
      )}
    </>
  )
}

const SimpleRenderers = ({
  geometryType,
  layerStyle,
  onChange
}: ISimpleRenderersProps) => {
  return (
    <div className="w-full h-fit relative">
      {geometryType === 'point' && (
        <MarkerSymbolBuilder value={layerStyle} onChange={onChange} />
      )}
      {geometryType === 'polyline' && (
        <SimpleLineSymbolBuilder value={layerStyle} onChange={onChange} />
      )}
      {geometryType === 'polygon' && (
        <SimpleFillSymbolBuilder value={layerStyle} onChange={onChange} />
      )}
    </div>
  )
}

export default SimpleRenderers
