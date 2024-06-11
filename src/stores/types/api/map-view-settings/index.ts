export type MapViewSettingsFindOneParamType = {
  orgCode: string
}
export type MapViewSettingsFindOneResponseType = {
  id: string
  latitude: number
  longitude: number
  zoomLevel: number
}
export type MapViewSettingsFindOneQuery = {
  ParamType: MapViewSettingsFindOneParamType
  ResponseType: MapViewSettingsFindOneResponseType
}

export type MapViewSettingsUpdateParamType = {
  orgCode: string
  access_token: string
  latitude: number
  longitude: number
  zoomLevel: number
}
export type MapViewSettingsUpdateResponseType = {
  message: string
}
export type MapViewSettingsUpdateQuery = {
  ParamType: MapViewSettingsUpdateParamType
  ResponseType: MapViewSettingsUpdateResponseType
}
