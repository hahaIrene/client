import { DateType } from 'react-tailwindcss-datepicker'

export interface ISensor {
  id: string
  name: string
  coordinate: {
    type: string
    coordinates: number[]
  }
}
export type SensorFindAllParamType = null

export type SensorFindAllAppInfo = ISensor[]

export type SensorFindAllQuery = {
  ParamType: SensorFindAllParamType
  ResponseType: SensorFindAllAppInfo
}

export interface LatestHistory {
  sensorId: string
  sensorName: string
  coordinate: {
    type: string
    coordinates: [number, number]
  }
  historyId: string
  createdAt: Date
  value: number
}

export type SensorLatestHistoryParamType = null

export type SensorLatestHistoryAppInfo = LatestHistory[]

export type SensorLatestHistoryQuery = {
  ParamType: SensorLatestHistoryParamType
  ResponseType: SensorLatestHistoryAppInfo
}

export interface SensorFindOne {
  id: string
  sensorID: string
  createdAt: Date
  value: number
}

export type SensorFindOneParamType = {
  id: string
  endTime: string
  startTime: string
}

export type SensorFindOneAppInfo = SensorFindOneParamType[]

export type SensorFindOneQuery = {
  ParamType: SensorFindOneParamType
  ResponseType: SensorFindOneAppInfo
}

export type SensorFindOneInfoQuery = {
  ParamType: { id: string }
  ResponseType: ISensor
}
