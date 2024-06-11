import ILayer from '../layer'

export interface IStoryLayer extends ILayer {
  id: string
  name: string
  uri: string
  createdAt: string
  updatedAt: string
}

export type StoryLayerFindAllQuery = {
  ParamType: { orgCode: string }
  ResponseType: IStoryLayer[]
}

export type StoryLayerFindOneQuery = {
  ParamType: { orgCode: string; uri: string }
  ResponseType: IStoryLayer
}

export type StoryLayerCreateQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    name: string
    uri: string
  }
  ResponseType: { message: string }
}

export type StoryLayerDeleteQuery = {
  ParamType: { orgCode: string; access_token: string; uri: string }
  ResponseType: { message: string }
}

export type StoryLayerEditQuery = {
  ParamType: {
    orgCode: string
    access_token: string
    name: string
    uri: string
  }
  ResponseType: { message: string }
}

export type StoryLayerBackupQuery = {
  ParamType: { orgCode: string; uri: string; access_token: string }
  ResponseType: string
}
