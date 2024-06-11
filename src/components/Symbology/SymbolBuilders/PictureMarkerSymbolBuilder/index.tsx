import React from 'react'

interface IPictureMarkerSymbolBuilderProps {
  value: string | undefined
  onChange: (value: string) => void
}

const PictureMarkerSymbolBuilder = ({}: IPictureMarkerSymbolBuilderProps) => {
  return (
    <div className="w-full h-fit relative">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">width</span>
        </div>
        <input type="number" className="input input-sm input-bordered w-full" />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">height</span>
        </div>
        <input type="number" className="input input-sm input-bordered w-full" />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">svg</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered file-input-sm w-full"
        />
      </label>
    </div>
  )
}

export default PictureMarkerSymbolBuilder
