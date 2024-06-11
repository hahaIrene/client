'use client'

import AppProvider from '@/containers/AppProvider'
import LoadingScreen from '@/map/widget/LoadingScreen'
import React from 'react'
import dynamic from 'next/dynamic'

const HomeContainer = dynamic(() => import('../containers/HomeContainer'), {
  ssr: false
  // loading: () => <LoadingScreen />
})

export default function Home() {
  return (
    <AppProvider>
      <HomeContainer />
    </AppProvider>
  )
}
