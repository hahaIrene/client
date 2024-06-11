import { AppHealthQuery } from '@/stores/types/api/app'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/health`
  }),
  endpoints: (builder) => ({
    health: builder.query<
      AppHealthQuery['ResponseType'],
      AppHealthQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.orgCode}`,
        method: 'get'
      })
    })
  })
})

export const { useLazyHealthQuery } = appApi
