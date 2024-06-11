import React, { useEffect, useState } from 'react'
import Color from '@arcgis/core/Color.js'
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js'
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js'

type OutlineStyle =
  | 'solid'
  | 'none'
  | 'dash'
  | 'dash-dot'
  | 'dot'
  | 'long-dash'
  | 'long-dash-dot'
  | 'long-dash-dot-dot'
  | 'short-dash'
  | 'short-dash-dot'
  | 'short-dash-dot-dot'
  | 'short-dot'

interface ISimpleLineSymbolBuilderProps {
  value: string | undefined
  onChange: (value: string) => void
}

const SimpleLineSymbolBuilder = ({
  value,
  onChange
}: ISimpleLineSymbolBuilderProps) => {
  const [width, setwidth] = useState(1)
  const [color, setcolor] = useState('#000000')
  const [lineStyle, setlineStyle] = useState<OutlineStyle>('solid')

  useEffect(() => {
    if (!value) return
    const renderer = SimpleRenderer.fromJSON(JSON.parse(value))
    const symbol = renderer.symbol as SimpleLineSymbol
    setwidth(symbol.width)
    setcolor(symbol.color.toHex())
    setlineStyle(symbol.style)
  }, [])

  useEffect(() => {
    const simpleFillSymbol = new SimpleLineSymbol({
      color: Color.fromHex(color),
      style: lineStyle,
      width: width
    })
    const simpleRenderer = new SimpleRenderer({
      symbol: simpleFillSymbol
    })
    onChange(JSON.stringify(simpleRenderer.toJSON()))
  }, [width, color, lineStyle])

  return (
    <div className="w-full h-fit relative">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">width</span>
        </div>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          value={width}
          onChange={(e) => setwidth(Number(e.target.value))}
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
          <span className="label-text">style</span>
        </div>
        <select
          className="select select-sm select-bordered"
          value={lineStyle}
          onChange={(e) => setlineStyle(e.target.value as OutlineStyle)}
        >
          <option>solid</option>
          <option>dash</option>
          <option>dash-dot</option>
          <option>dot</option>
          <option>long-dash</option>
          <option>long-dash-dot</option>
          <option>long-dash-dot-dot</option>
          <option>short-dash</option>
          <option>short-dash-dot</option>
          <option>short-dash-dot-dot</option>
          <option>short-dot</option>
        </select>
      </label>
    </div>
  )
}

export default SimpleLineSymbolBuilder
