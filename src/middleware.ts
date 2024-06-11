import { AuthProfileQuery } from '@/stores/types/api/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getOrgCodeFromUrl = (url: string) => {
  let orgCideIndex = 3
  if (process.env.NEXT_PUBLIC_BASE_PATH === '') {
    orgCideIndex = 1
  }
  const urlObject = new URL(url)
  const orgCode = urlObject.pathname.split('/').at(orgCideIndex)
  return orgCode
}

const verifyTokenServerSide = async ({
  access_token
}: AuthProfileQuery['ParamType']) => {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${access_token}`)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL_MIDDLEWARE}/auth/profile`,
    {
      method: 'GET',
      headers: headers
    }
  )
  return response
}

export const middleware = async (request: NextRequest) => {
  const { cookies, url } = request
  const token = cookies.get('token')
  const orgCode = getOrgCodeFromUrl(url)

  // if user doesn't have token in cookies, then redirect to login page
  if (!token) {
    console.log('no token in cookie')
    return NextResponse.redirect(
      new URL(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/${orgCode}/signIn`,
        request.url
      )
    )
  }
  // verify user token
  const response = await verifyTokenServerSide({ access_token: token.value })
  if (response.status !== 200) {
    console.log('token invalid')
    return NextResponse.redirect(
      new URL(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/${orgCode}/signIn`,
        request.url
      )
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/:orgCode/',
    '/:orgCode/setting/map',
    '/:orgCode/setting/manifest',
    '/:orgCode/setting/layerEditor',
    '/:orgCode/layer/story',
    '/:orgCode/layer/vector',
    '/:orgCode/layer/wmts',
    '/:orgCode/center/org',
    '/:orgCode/center/org/:orgCode4Info',
    '/:orgCode/management/user'
  ]
}
