import ILayer from '../layer'

export interface IVectorLayer extends ILayer {
  id: string
  name: string
  filename: string
  createdAt: string
  updatedAt: string
}

export type VectorLayerFindAllQuery = {
  ParamType: { orgCode: string }
  ResponseType: IVectorLayer[]
}

export type VectorLayerFindOneQuery = {
  ParamType: { orgCode: string; id: string }
  ResponseType: IVectorLayer
}

export type VectorLayerCreateQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    name: string
    file: File
  }
  ResponseType: { message: string }
}

export type VectorLayerDeleteQuery = {
  ParamType: { orgCode: string; access_token: string; id: string }
  ResponseType: { message: string }
}

export type VectorLayerEditQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    id: string
    name: string
    file: File
  }
  ResponseType: { message: string }
}

export type VectorLayerStaticQuery = {
  ParamType: { orgCode: string; filename: string }
  ResponseType: string
}
