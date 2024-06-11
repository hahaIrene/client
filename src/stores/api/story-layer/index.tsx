import {
  StoryLayerBackupQuery,
  StoryLayerCreateQuery,
  StoryLayerDeleteQuery,
  StoryLayerEditQuery,
  StoryLayerFindAllQuery,
  StoryLayerFindOneQuery
} from '@/stores/types/api/story-layer'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const storyLayerApi = createApi({
  reducerPath: 'storyLayerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/story-layer`
  }),
  endpoints: (builder) => ({
    storyLayerFindAll: builder.query<
      StoryLayerFindAllQuery['ResponseType'],
      StoryLayerFindAllQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    storyLayerFindOne: builder.query<
      StoryLayerFindOneQuery['ResponseType'],
      StoryLayerFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.uri}`,
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    storyLayerCreate: builder.mutation<
      StoryLayerCreateQuery['ResponseType'],
      StoryLayerCreateQuery['ParamType']
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
    storyLayerDelete: builder.mutation<
      StoryLayerDeleteQuery['ResponseType'],
      StoryLayerDeleteQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.uri}`,
        method: 'delete',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    storyLayerEdit: builder.mutation<
      StoryLayerEditQuery['ResponseType'],
      StoryLayerEditQuery['ParamType']
    >({
      query: (param) => ({
        url: `/${param.uri}`,
        method: 'PATCH',
        body: {
          name: param.name,
          uri: param.uri
        },
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    }),
    storyLayerBackup: builder.mutation<
      StoryLayerBackupQuery['ResponseType'],
      StoryLayerBackupQuery['ParamType']
    >({
      query: (param) => ({
        url: `fetch/${param.uri}`,
        method: 'get',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        }
      })
    })
  })
})

export const {
  useLazyStoryLayerFindAllQuery,
  useLazyStoryLayerFindOneQuery,
  useStoryLayerDeleteMutation,
  useStoryLayerEditMutation,
  useStoryLayerCreateMutation,
  useStoryLayerBackupMutation
} = storyLayerApi
