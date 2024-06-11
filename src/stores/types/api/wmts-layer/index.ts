import ILayer from '../layer'

export interface IWmtsLayer extends ILayer {
  id: string
  name: string
  source: string
  subLayer: string
  createdAt: string
  updatedAt: string
}

export type WmtsLayerFindAllQuery = {
  ParamType: { orgCode: string }
  ResponseType: IWmtsLayer[]
}

export type WmtsLayerFindOneQuery = {
  ParamType: { orgCode: string; id: string }
  ResponseType: IWmtsLayer
}

export type WmtsCreateQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    name: string
    source: string
    subLayer: string
  }
  ResponseType: { message: string }
}

export type WmtsDeleteQuery = {
  ParamType: { orgCode: string; access_token: string; id: string }
  ResponseType: { message: string }
}

export type WmtsEditQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    id: string
    name: string
    source: string
    subLayer: string
  }
  ResponseType: { message: string }
}
