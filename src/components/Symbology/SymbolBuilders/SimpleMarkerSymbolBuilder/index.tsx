import React, { useEffect, useState } from 'react'
import Color from '@arcgis/core/Color.js'
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js'
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol.js'

type MarkerStyle =
  | 'circle'
  | 'cross'
  | 'square'
  | 'x'
  | 'diamond'
  | 'triangle'
  | 'path'

interface ISimpleMarkerSymbolBuilderProps {
  value: string | undefined
  onChange: (value: string) => void
}

const SimpleMarkerSymbolBuilder = ({
  value,
  onChange
}: ISimpleMarkerSymbolBuilderProps) => {
  const [size, setsize] = useState(10)
  const [style, setstyle] = useState<MarkerStyle>('circle')
  const [outlineWidth, setoutlineWidth] = useState(1)
  const [color, setcolor] = useState('#000000')
  const [outlineColor, setoutlineColor] = useState('#000000')

  useEffect(() => {
    if (!value) return
    const renderer = SimpleRenderer.fromJSON(JSON.parse(value))
    const symbol = renderer.symbol as SimpleMarkerSymbol
    setsize(symbol.size)
    setstyle(symbol.style)
    setoutlineWidth(symbol.outline.width)
    setcolor(symbol.color.toHex())
    setoutlineColor(symbol.outline.color.toHex())
  }, [])

  useEffect(() => {
    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      angle: 0,
      color: Color.fromHex(color),
      outline: new SimpleLineSymbol({
        color: Color.fromHex(outlineColor),
        miterLimit: 1,
        width: outlineWidth
      }),
      size: size,
      style: style,
      xoffset: 0,
      yoffset: 0
    })
    const simpleRenderer = new SimpleRenderer({
      symbol: simpleMarkerSymbol
    })
    onChange(JSON.stringify(simpleRenderer.toJSON()))
  }, [size, style, outlineWidth, color, outlineColor])

  return (
    <div className="w-full h-fit relative">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">size</span>
        </div>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          value={size}
          onChange={(e) => setsize(Number(e.target.value))}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">style</span>
        </div>
        <select
          className="select select-sm select-bordered"
          value={style}
          onChange={(e) => setstyle(e.target.value as MarkerStyle)}
        >
          <option>circle</option>
          <option>square</option>
          <option>cross</option>
          <option>x</option>
          <option>diamond</option>
          <option>triangle</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">outline width</span>
        </div>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          value={outlineWidth}
          onChange={(e) => setoutlineWidth(Number(e.target.value))}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">color</span>
        </div>
        <input
          type="color"
          className="input input-sm input-bordered w-full"
          value={color}
          onChange={(e) => setcolor(e.target.value)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">outline color</span>
        </div>
        <input
          type="color"
          className="input input-sm input-bordered w-full"
          value={outlineColor}
          onChange={(e) => setoutlineColor(e.target.value)}
        />
      </label>
    </div>
  )
}

export default SimpleMarkerSymbolBuilder
