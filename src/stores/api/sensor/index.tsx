import {
  SensorFindAllQuery,
  SensorFindOneInfoQuery,
  SensorFindOneQuery,
  SensorLatestHistoryQuery
} from '@/stores/types/api/sensor'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sensorAPI = createApi({
  reducerPath: 'sensorAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_RADIABEE_APISOURCE}/sensor`
  }),
  endpoints: (builder) => ({
    findAll: builder.query<
      SensorFindAllQuery['ResponseType'],
      SensorFindAllQuery['ParamType']
    >({
      query: () => ({
        url: '',
        method: 'get'
      })
    }),
    getLatestHistories: builder.query<
      SensorLatestHistoryQuery['ResponseType'],
      SensorLatestHistoryQuery['ParamType']
    >({
      query: () => ({
        url: '/aaa/:uri',
        method: 'get'
      })
    }),
    findOne: builder.query<
      SensorFindOneQuery['ResponseType'],
      SensorFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url:  `/${param.id}?endTime=${param.endTime}&startTime=${param.startTime}`,
        method: 'get'
      })
    }),
    findOneInfo: builder.query<
      SensorFindOneInfoQuery['ResponseType'],
      SensorFindOneInfoQuery['ParamType']
    >({
      query: (param) => ({
        url: `/info/${param.id}`,
        method: 'get'
      })
    })
  })
})

export const {
  useLazyFindAllQuery,
  useLazyGetLatestHistoriesQuery,
  useLazyFindOneQuery,
  useFindOneQuery,
  useFindOneInfoQuery,
} = sensorAPI
