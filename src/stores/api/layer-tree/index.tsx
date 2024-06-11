import {
  LayerTreeQuery,
  LayerTreeUpdateMutation
} from '@/stores/types/api/layer-tree'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const layerTreeApi = createApi({
  reducerPath: 'layerTreeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/layer-tree`
  }),
  endpoints: (builder) => ({
    layerTree: builder.query<
      LayerTreeQuery['ResponseType'],
      LayerTreeQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.code}`,
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    layerTreeUpdate: builder.mutation<
      LayerTreeUpdateMutation['ResponseType'],
      LayerTreeUpdateMutation['ParamType']
    >({
      query: (param) => ({
        url: `/${param.code}`,
        method: 'PATCH',
        body: {
          content: param.content
        },
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.token}`
        }
      })
    })
  })
})

export const { useLazyLayerTreeQuery, useLayerTreeUpdateMutation } =
  layerTreeApi
