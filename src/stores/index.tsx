'use client'

import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import { appApi } from './api/app'
import { authApi } from './api/auth'
import { layerTreeApi } from './api/layer-tree'
import { mapViewSettingsApi } from './api/map-view-settings'
import { orgApi } from './api/org'
import { planApi } from './api/plan'
import { sensorAPI } from './api/sensor'
import { storyLayerApi } from './api/story-layer'
import { userApi } from './api/user'
import { VectorLayerApi, VectorLayerStatic } from './api/vector-layer'
import { webSettingsApi } from './api/web-settings'
import { wmtsApi } from './api/wmts'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
    [mapViewSettingsApi.reducerPath]: mapViewSettingsApi.reducer,
    [wmtsApi.reducerPath]: wmtsApi.reducer,
    [storyLayerApi.reducerPath]: storyLayerApi.reducer,
    [VectorLayerApi.reducerPath]: VectorLayerApi.reducer,
    [VectorLayerStatic.reducerPath]: VectorLayerStatic.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orgApi.reducerPath]: orgApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    [webSettingsApi.reducerPath]: webSettingsApi.reducer,
    [layerTreeApi.reducerPath]: layerTreeApi.reducer,
    [sensorAPI.reducerPath]: sensorAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(appApi.middleware)
      .concat(mapViewSettingsApi.middleware)
      .concat(wmtsApi.middleware)
      .concat(storyLayerApi.middleware)
      .concat(VectorLayerApi.middleware)
      .concat(VectorLayerStatic.middleware)
      .concat(userApi.middleware)
      .concat(orgApi.middleware)
      .concat(planApi.middleware)
      .concat(webSettingsApi.middleware)
      .concat(layerTreeApi.middleware)
      .concat(sensorAPI.middleware)
})

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
