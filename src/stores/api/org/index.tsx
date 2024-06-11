import {
  OrgCreateQuery,
  OrgDeleteQuery,
  OrgFindAllQuery,
  OrgFindOneQuery,
  OrgUpdateQuery
} from '@/stores/types/api/org'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orgApi = createApi({
  reducerPath: 'orgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/org`
  }),
  endpoints: (builder) => ({
    orgFindAll: builder.query<
      OrgFindAllQuery['ResponseType'],
      OrgFindAllQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    orgFindOne: builder.query<
      OrgFindOneQuery['ResponseType'],
      OrgFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.orgCode}`,
        method: 'get'
      })
    }),
    orgCreate: builder.mutation<
      OrgCreateQuery['ResponseType'],
      OrgCreateQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'post',
        headers: {
          Authorization: `Bearer ${param.access_token}`
        },
        body: {
          orgName: param.orgName,
          code: param.code,
          userName: param.userName,
          userEmail: param.userEmail,
          userPassword: param.userPassword,
          planCode: param.planCode
        }
      })
    }),
    orgUpdate: builder.mutation<
      OrgUpdateQuery['ResponseType'],
      OrgUpdateQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${param.access_token}`
        },
        body: {
          name: param.name,
          updateCode: param.updateCode,
          planCode: param.planCode
        }
      })
    }),
    orgDelete: builder.mutation<
      OrgDeleteQuery['ResponseType'],
      OrgDeleteQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.code}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${param.access_token}`
        }
      })
    })
  })
})

export const {
  useLazyOrgFindAllQuery,
  useLazyOrgFindOneQuery,
  useOrgCreateMutation,
  useOrgUpdateMutation,
  useOrgDeleteMutation
} = orgApi
