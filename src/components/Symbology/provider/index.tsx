import React, { createContext, useState } from 'react'

export type RendererType = 'simple' | 'unique' | 'pie' | undefined
export type GeometryType = 'point' | 'polyline' | 'polygon' | undefined

interface ISymbolBuilderContext {
  rendererType: RendererType
  geometryType: GeometryType
  layerStyle: string | undefined
  onLayerStyleChange: (style: string) => void
  onRendererTypeChange: (type: RendererType) => void
  resetBuilder: () => void
}

export const SymbolBuilderContext = createContext<ISymbolBuilderContext>({
  rendererType: undefined,
  geometryType: undefined,
  layerStyle: undefined,
  onLayerStyleChange: () => {},
  onRendererTypeChange: () => {},
  resetBuilder: () => {}
})

const SymbolBuilderProvider = ({
  geometryType,
  children
}: {
  geometryType: GeometryType
  children: React.ReactNode
}) => {
  const [rendererType, setrendererType] = useState<RendererType>('simple')
  const [layerStyle, setlayerStyle] = useState<string | undefined>(undefined)

  const resetBuilder = () => {
    setrendererType(undefined)
  }

  return (
    <SymbolBuilderContext.Provider
      value={{
        rendererType,
        geometryType,
        layerStyle,
        onLayerStyleChange: (v) => {
          setlayerStyle(v)
        },
        resetBuilder,
        onRendererTypeChange: (v) => {
          setrendererType(v)
        }
      }}
    >
      {children}
    </SymbolBuilderContext.Provider>
  )
}

export default SymbolBuilderProvider
