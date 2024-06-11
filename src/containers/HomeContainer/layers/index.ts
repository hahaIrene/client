import { SensorLatestHistoryAppInfo } from '@/stores/types/api/sensor'
import PopupTemplate from '@arcgis/core/PopupTemplate.js'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer.js'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol'
import Color from '@arcgis/core/Color'

export const sensorsLayerId = 'sensorsLayer'

export const generateSensorsLayer = (data: SensorLatestHistoryAppInfo) => {
  const features = data.map((item) => {
    return {
      type: 'Feature',
      properties: {
        sensorId: item.sensorId,
        sensorName: item.sensorName,
        historyId: item.historyId,
        createdAt: item.createdAt,
        value: item.value
      },
      geometry: {
        type: 'Point',
        coordinates: item.coordinate.coordinates
      }
    }
  })

  const geojson = {
    type: 'FeatureCollection',
    features: features
  }

  const blob = new Blob([JSON.stringify(geojson)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)

  const symbol1 = new SimpleMarkerSymbol({
    color: new Color([255, 245, 143, 1]),
    outline: new SimpleLineSymbol({
      cap: 'round',
      color: new Color([255, 255, 255, 1]),
      join: 'round',
      miterLimit: 1,
      style: 'solid',
      width: 1
    }),
    size: 8,
    style: 'circle'
  })
  const symbol2 = new SimpleMarkerSymbol({
    color: new Color([148, 255, 51, 1]),
    outline: new SimpleLineSymbol({
      cap: 'round',
      color: new Color([255, 255, 255, 1]),
      join: 'round',
      miterLimit: 1,
      style: 'solid',
      width: 1
    }),
    size: 8,
    style: 'circle'
  })
  const symbol3 = new SimpleMarkerSymbol({
    color: new Color([24, 160, 100, 1]),
    outline: new SimpleLineSymbol({
      cap: 'round',
      color: new Color([255, 255, 255, 1]),
      join: 'round',
      miterLimit: 1,
      style: 'solid',
      width: 1
    }),
    size: 8,
    style: 'circle'
  })

  const symbol4 = new SimpleMarkerSymbol({
    color: new Color([77, 140, 140, 1]),
    outline: new SimpleLineSymbol({
      cap: 'round',
      color: new Color([255, 255, 255, 1]),
      join: 'round',
      miterLimit: 1,
      style: 'solid',
      width: 1
    }),
    size: 8,
    style: 'circle'
  })

  const symbol5 = new SimpleMarkerSymbol({
    color: new Color([16, 48, 94, 1]),
    outline: new SimpleLineSymbol({
      cap: 'round',
      color: new Color([255, 255, 255, 1]),
      join: 'round',
      miterLimit: 1,
      style: 'solid',
      width: 1
    }),
    size: 8,
    style: 'circle'
  })

  const renderer = new ClassBreaksRenderer({
    field: 'value',
    classBreakInfos: [
      {
        minValue: 0.0,
        maxValue: 0.04,
        symbol: symbol1
      },
      {
        minValue: 0.0401,
        maxValue: 0.045,
        symbol: symbol2
      },
      {
        minValue: 0.0451,
        maxValue: 0.05,
        symbol: symbol3
      },
      {
        minValue: 0.0501,
        maxValue: 0.06,
        symbol: symbol4
      },
      {
        minValue: 0.0601,
        maxValue: 1,
        symbol: symbol5
      }
    ]
  })

  const popupTemplate = new PopupTemplate({
    title: '{sensorName}',
    content: [
      {
        type: 'fields',
        fieldInfos: [
          {
            fieldName: 'value',
            label: '輻射值'
          },
          {
            fieldName: 'createdAt',
            label: '時間'
          }
        ]
      }
    ]
  })

  const sensorsLayer = new GeoJSONLayer({
    url,
    id: sensorsLayerId,
    renderer: renderer,
    popupTemplate: popupTemplate,
    outFields: ['*']
  })
  return { sensorsLayer }
}
