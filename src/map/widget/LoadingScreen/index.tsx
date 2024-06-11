import React from 'react'

const LoadingScreen = ({ className }: { className?: string }) => {
  return (
    <div
      className={`calcite-box skeleton w-full h-full z-50 ${className}`}
    ></div>
  )
}

export default LoadingScreen
