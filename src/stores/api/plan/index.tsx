import { PlanFindAllQuery } from '@/stores/types/api/plan'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/plan`
  }),
  endpoints: (builder) => ({
    planFindAll: builder.query<
      PlanFindAllQuery['ResponseType'],
      PlanFindAllQuery['ParamType']
    >({
      query: () => ({
        url: '',
        method: 'get'
      })
    })
  })
})

export const { useLazyPlanFindAllQuery } = planApi
