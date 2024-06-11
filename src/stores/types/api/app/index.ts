import { IPlan } from '../plan'
import { IStoryLayer } from '../story-layer'
import { IUser } from '../user'
import { IVectorLayer } from '../vector-layer'
import { IWmtsLayer } from '../wmts-layer'

export type AppHealthParamType = {
  orgCode: string
}

export type IAppInfo = {
  org: {
    id: string
    name: string
    code: string
    createAt: string
    updatedAt: string
  }
  plan: {
    id: string
    plan: IPlan
  }
  users: IUser[]
  wmtsLayers: IWmtsLayer[]
  storyLayers: IStoryLayer[]
  vectorLayers: IVectorLayer[]
}

export type AppHealthQuery = {
  ParamType: AppHealthParamType
  ResponseType: IAppInfo
}
