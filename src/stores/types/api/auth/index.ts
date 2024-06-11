export type AuthSignInParamType = {
  email: string
  password: string
  orgCode: string
}

export type AuthSignInResponseType = {
  access_token: string
}

export type AuthSignInQuery = {
  ParamType: AuthSignInParamType
  ResponseType: AuthSignInResponseType
}

export type AuthProfileParamType = {
  access_token: string
}

export type AuthProfileResponseType = {
  email: string
  exp: number
  iat: number
  isAdmin: boolean
  isRoot: boolean
  sub: string
}

export type AuthProfileQuery = {
  ParamType: AuthProfileParamType
  ResponseType: AuthProfileResponseType
}
