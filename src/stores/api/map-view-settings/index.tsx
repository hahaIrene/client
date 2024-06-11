import {
  MapViewSettingsFindOneQuery,
  MapViewSettingsUpdateQuery
} from '@/stores/types/api/map-view-settings'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mapViewSettingsApi = createApi({
  reducerPath: 'mapViewSettingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/map-view-settings`
  }),
  endpoints: (builder) => ({
    mapViewSettingsFindOne: builder.query<
      MapViewSettingsFindOneQuery['ResponseType'],
      MapViewSettingsFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    mapViewSettingsUpdate: builder.mutation<
      MapViewSettingsUpdateQuery['ResponseType'],
      MapViewSettingsUpdateQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'put',
        body: {
          latitude: param.latitude,
          longitude: param.longitude,
          zoomLevel: param.zoomLevel
        },
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    })
  })
})

export const {
  useLazyMapViewSettingsFindOneQuery,
  useMapViewSettingsUpdateMutation
} = mapViewSettingsApi
