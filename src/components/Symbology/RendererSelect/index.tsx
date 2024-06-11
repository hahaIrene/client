import React, { useContext } from 'react'
import { RendererType, SymbolBuilderContext } from '../provider'

const RendererSelect = () => {
  const { rendererType, onRendererTypeChange } =
    useContext(SymbolBuilderContext)
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Please select render type</span>
      </div>
      <select
        className="select select-bordered w-full"
        value={rendererType}
        onChange={(e) => onRendererTypeChange(e.target.value as RendererType)}
      >
        <option value={'simple'}>Simple</option>
        <option value={'unique'}>Unique (尚未開放)</option>
        <option value={'pie'}>Pie (尚未開放)</option>
      </select>
    </label>
  )
}

export default RendererSelect
