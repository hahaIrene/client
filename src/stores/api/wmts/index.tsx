import {
  WmtsCreateQuery,
  WmtsDeleteQuery,
  WmtsEditQuery,
  WmtsLayerFindAllQuery,
  WmtsLayerFindOneQuery
} from '@/stores/types/api/wmts-layer'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wmtsApi = createApi({
  reducerPath: 'wmtsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/wmts-layer`
  }),
  endpoints: (builder) => ({
    wmtsFindAll: builder.query<
      WmtsLayerFindAllQuery['ResponseType'],
      WmtsLayerFindAllQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    wmtsFindOne: builder.query<
      WmtsLayerFindOneQuery['ResponseType'],
      WmtsLayerFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    wmtsCreate: builder.mutation<
      WmtsCreateQuery['ResponseType'],
      WmtsCreateQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'post',
        body: param,
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    wmtsDelete: builder.mutation<
      WmtsDeleteQuery['ResponseType'],
      WmtsDeleteQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'delete',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    wmtsEdit: builder.mutation<
      WmtsEditQuery['ResponseType'],
      WmtsEditQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'PATCH',
        body: {
          name: param.name,
          source: param.source,
          subLayer: param.subLayer
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
  useLazyWmtsFindAllQuery,
  useLazyWmtsFindOneQuery,
  useWmtsCreateMutation,
  useWmtsDeleteMutation,
  useWmtsEditMutation
} = wmtsApi
