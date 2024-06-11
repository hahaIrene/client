import {
  WebSettingsFindOneQuery,
  WebSettingsUpdateMutation
} from '@/stores/types/api/web-settings'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const webSettingsApi = createApi({
  reducerPath: 'webSettingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SOURCE}/web-settings`
  }),
  endpoints: (builder) => ({
    WebSettingsFindOne: builder.query<
      WebSettingsFindOneQuery['ResponseType'],
      WebSettingsFindOneQuery['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'get',
        headers: {
          orgCode: param.orgCode
        }
      })
    }),
    WebSettingsUpdate: builder.mutation<
      WebSettingsUpdateMutation['ResponseType'],
      WebSettingsUpdateMutation['ParamType']
    >({
      query: (param) => ({
        url: '',
        method: 'PATCH',
        headers: {
          orgCode: param.orgCode,
          Authorization: `Bearer ${param.access_token}`
        },
        body: {
          websiteTitle: param.websiteTitle,
          mainTitle: param.mainTitle,
          aboutTab: param.aboutTab,
          aboutTextHtml: param.aboutTextHtml,
          copyRightTab: param.copyRightTab,
          copyRightTextHtml: param.copyRightTextHtml,
          howToTab: param.howToTab,
          howToTextHtml: param.howToTextHtml
        }
      })
    })
  })
})

export const { useLazyWebSettingsFindOneQuery, useWebSettingsUpdateMutation } =
  webSettingsApi
