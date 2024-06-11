import React, { useContext } from 'react'
import RendererSelect from './RendererSelect'
import SimpleRenderers from './Renderers/SimpleRenderers'
import { SymbolBuilderContext } from './provider'

const SymbolBuilder = () => {
  const { rendererType, geometryType, layerStyle, onLayerStyleChange } =
    useContext(SymbolBuilderContext)
  return (
    <div className="w-full h-full relative calcite-box p-4 overflow-auto">
      <RendererSelect />
      <div className="divider"></div>
      {rendererType === 'simple' && geometryType && (
        <SimpleRenderers
          geometryType={geometryType}
          layerStyle={layerStyle}
          onChange={onLayerStyleChange}
        />
      )}
    </div>
  )
}

export default SymbolBuilder
