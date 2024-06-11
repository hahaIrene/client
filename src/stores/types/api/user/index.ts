export interface IUser {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isRoot: boolean
  createdAt: string
  updatedAt: string
}

export type UserFindAllQuery = {
  ResponseType: IUser[]
  ParamType: {
    orgCode: string
    access_token: string
  }
}

export type UserCreateQuery = {
  ResponseType: { message: string }
  ParamType: {
    orgCode: string
    access_token: string
    name: string
    email: string
    password: string
  }
}

export type UserUpdateQuery = {
  ResponseType: { message: string }
  ParamType: {
    orgCode: string
    access_token: string
    id: string
    name: string
    password: string
  }
}

export type UserDeleteQuery = {
  ResponseType: { message: string }
  ParamType: {
    orgCode: string
    access_token: string
    id: string
  }
}
