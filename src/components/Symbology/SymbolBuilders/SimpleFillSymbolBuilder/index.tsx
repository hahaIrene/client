import React, { useEffect, useState } from 'react'
import Color from '@arcgis/core/Color.js'
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer.js'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js'
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol.js'

type FillStyle =
  | 'solid'
  | 'none'
  | 'backward-diagonal'
  | 'cross'
  | 'diagonal-cross'
  | 'forward-diagonal'
  | 'horizontal'
  | 'vertical'
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

interface ISimpleFillSymbolBuilderProps {
  value: string | undefined
  onChange: (value: string) => void
}

const SimpleFillSymbolBuilder = ({
  value,
  onChange
}: ISimpleFillSymbolBuilderProps) => {
  const [fillStyle, setfillStyle] = useState<FillStyle>('solid')
  const [outlineStyle, setoutlineStyle] = useState<OutlineStyle>('solid')
  const [outlineWidth, setoutlineWidth] = useState<number>(1)
  const [color, setcolor] = useState('#ffc773')
  const [outlineColor, setoutlineColor] = useState('#c7c7c7')

  useEffect(() => {
    if (!value) return
    const renderer = SimpleRenderer.fromJSON(JSON.parse(value))
    const symbol = renderer.symbol as SimpleFillSymbol
    setfillStyle(symbol.style)
    setoutlineStyle(symbol.outline.style)
    setoutlineWidth(symbol.outline.width)
    setcolor(symbol.color.toHex())
    setoutlineColor(symbol.outline.color.toHex())
  }, [])

  useEffect(() => {
    const simpleFillSymbol = new SimpleFillSymbol({
      color: Color.fromHex(color),
      outline: new SimpleLineSymbol({
        cap: 'round',
        color: Color.fromHex(outlineColor),
        join: 'round',
        miterLimit: 1,
        style: outlineStyle,
        width: outlineWidth
      }),
      style: fillStyle
    })

    const simpleRenderer = new SimpleRenderer({
      symbol: simpleFillSymbol
    })
    onChange(JSON.stringify(simpleRenderer.toJSON()))
  }, [fillStyle, outlineStyle, outlineWidth, color, outlineColor])

  return (
    <div className="w-full h-fit relative">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">style</span>
        </div>
        <select
          className="select select-sm select-bordered"
          value={fillStyle}
          onChange={(e) => setfillStyle(e.target.value as FillStyle)}
        >
          <option>solid</option>
          <option>backward-diagonal</option>
          <option>cross</option>
          <option>diagonal-cross</option>
          <option>forward-diagonal</option>
          <option>horizontal</option>
          <option>vertical</option>
        </select>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">outline style</span>
        </div>
        <select
          className="select select-sm select-bordered"
          value={outlineStyle}
          onChange={(e) => setoutlineStyle(e.target.value as OutlineStyle)}
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

export default SimpleFillSymbolBuilder
