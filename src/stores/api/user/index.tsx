import {
  UserCreateQuery,
  UserDeleteQuery,
  UserFindAllQuery,
  UserUpdateQuery
} from '@/stores/types/api/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/user`
  }),
  endpoints: (builder) => ({
    userFindAll: builder.query<
      UserFindAllQuery['ResponseType'],
      UserFindAllQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    userCreate: builder.mutation<
      UserCreateQuery['ResponseType'],
      UserCreateQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'post',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        },
        body: {
          name: param.name,
          email: param.email,
          password: param.password
        }
      })
    }),
    userUpdate: builder.mutation<
      UserUpdateQuery['ResponseType'],
      UserUpdateQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'PATCH',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        },
        body: {
          name: param.name,
          password: param.password
        }
      })
    }),
    userDelete: builder.mutation<
      UserDeleteQuery['ResponseType'],
      UserDeleteQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'delete',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    })
  })
})

export const {
  useLazyUserFindAllQuery,
  useUserCreateMutation,
  useUserUpdateMutation,
  useUserDeleteMutation
} = userApi
