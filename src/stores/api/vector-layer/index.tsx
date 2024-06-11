import {
  VectorLayerCreateQuery,
  VectorLayerDeleteQuery,
  VectorLayerEditQuery,
  VectorLayerFindAllQuery,
  VectorLayerFindOneQuery,
  VectorLayerStaticQuery
} from '@/stores/types/api/vector-layer'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const VectorLayerApi = createApi({
  reducerPath: 'vectorLayerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/vector-layer`
  }),
  endpoints: (builder) => ({
    vectorLayerFindAll: builder.query<
      VectorLayerFindAllQuery['ResponseType'],
      VectorLayerFindAllQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    vectorLayerFindOne: builder.query<
      VectorLayerFindOneQuery['ResponseType'],
      VectorLayerFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    vectorLayerCreate: builder.mutation<
      VectorLayerCreateQuery['ResponseType'],
      VectorLayerCreateQuery['ParamType']
    >({
      query: (param) => {
        const formData = new FormData()
        formData.append('name', param.name)
        formData.append('file', param.file)
        return {
          url: '/upload',
          method: 'post',
          body: formData,
          headers: {
            orgCode: param.orgCode,
            Authorization: `Bearer ${param.access_token}`
          }
        }
      }
    }),
    vectorLayerDelete: builder.mutation<
      VectorLayerDeleteQuery['ResponseType'],
      VectorLayerDeleteQuery['ParamType']
    >({
      query: (param) => {
        return {
          url: `/${param.id}`,
          method: 'delete',
          headers: {
            orgCode: param.orgCode,
            Authorization: `Bearer ${param.access_token}`
          }
        }
      }
    }),
    vectorLayerEdit: builder.mutation<
      VectorLayerEditQuery['ResponseType'],
      VectorLayerEditQuery['ParamType']
    >({
      query: (param) => {
        const formData = new FormData()
        formData.append('name', param.name)
        formData.append('file', param.file)
        return {
          url: `/${param.id}`,
          method: 'PATCH',
          body: formData,
          headers: {
            orgCode: param.orgCode,
            Authorization: `Bearer ${param.access_token}`
          }
        }
      }
    })
  })
})

export const {
  useLazyVectorLayerFindAllQuery,
  useLazyVectorLayerFindOneQuery,
  useVectorLayerCreateMutation,
  useVectorLayerDeleteMutation,
  useVectorLayerEditMutation
} = VectorLayerApi

export const VectorLayerStatic = createApi({
  reducerPath: 'vectorLayerStatic',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STATIC_SOURCE}`
  }),
  endpoints: (builder) => ({
    VectorLayerStatic: builder.query<
      VectorLayerStaticQuery['ResponseType'],
      VectorLayerStaticQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.orgCode}/vector-layer/${param.filename}`,
        method: 'get'
      })
    })
  })
})

export const { useLazyVectorLayerStaticQuery } = VectorLayerStatic
