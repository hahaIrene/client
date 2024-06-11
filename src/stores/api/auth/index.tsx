import { AuthProfileQuery, AuthSignInQuery } from '@/stores/types/api/auth'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/auth`
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<
      AuthSignInQuery['ResponseType'],
      AuthSignInQuery['ParamType']
    >({
      query: (param) => ({
        url: '/signIn',
        method: 'post',
        body: param,
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    profile: builder.query<
      AuthProfileQuery['ResponseType'],
      AuthProfileQuery['ParamType']
    >({
      query: (param) => ({
        url: '/profile',
        method: 'get',
        headers: {
          Authorization: `Bearer ${param.access_token}`
        }
      })
    })
  })
})

export const { useSignInMutation, useLazyProfileQuery } = authApi
