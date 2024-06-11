import { AppContext } from '@/containers/AppProvider'
import { useFindOneInfoQuery, useFindOneQuery } from '@/stores/api/sensor'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ReactECharts from 'echarts-for-react'
import React, { useContext } from 'react'
import { useState } from 'react'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import moment from 'moment'

const EmptyState = () => {
  return (
    <div className="w-full h-full items-center justify-center flex gap-4 flex-col">
      <MagnifyingGlassIcon className="w-12 h-12" />
      <p className="text-lg select-none">請點擊地圖上測站，以查詢資料</p>
    </div>
  )
}

const Operator = ({ sensorId }: { sensorId: string }) => {
  const { dateRange, onDateRangeChange } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const [chartX, setchartX] = useState<string[]>([])
  const [chartY, setchartY] = useState<number[]>([])
  const response = useFindOneInfoQuery({ id: sensorId })
  const sensorDate = useFindOneQuery({
    id: sensorId,
    endTime: dateRange?.endDate ? dateRange.endDate.toString() : '',
    startTime: dateRange?.startDate ? dateRange.startDate.toString() : ''
  })

  const handleQuery = async () => {
    setIsLoading(true)

    if (dateRange) {
      const { startDate, endDate } = dateRange
      const start = moment(startDate).format('YYYY-MM-DD')
      const end = moment(endDate).format('YYYY-MM-DD')
      try {
        const response = await fetch(
          `http://localhost:8080/api/sensor/${sensorId}?startTime=${start}&endTime=${end}`
        )
        const result = (await response.json()) as {
          createdAt: Date
          value: number
        }[]

        const xAxisData = result.map((item) =>
          moment(item.createdAt).format('YYYY-MM-DD')
        )
        const seriesData = result.map((item) => item.value)

        setchartX(xAxisData)
        setchartY(seriesData)
        console.log('success')
      } catch (error) {
        console.error('API 調用失敗', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="w-full h-full p-8">
      {response && response.data && (
        <div className="flex flex-col gap-2">
          <p className="text-xl">{response.data.name}</p>
          <div className="flex items-center gap-2 relative">
            <Datepicker
              value={dateRange}
              onChange={onDateRangeChange}
              primaryColor={'teal'}
            />
            {isLoading ? (
              <button className="btn">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                onClick={handleQuery}
                className="btn  btn-accent rounded-md h-full"
              >
                查詢
              </button>
            )}
          </div>
          <div className="divider"></div>
          <div className=" bg-base-100 rounded-md">
            <ReactECharts
              option={{
                xAxis: {
                  type: 'category',
                  data: chartX
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    data: chartY,
                    type: 'line',
                    smooth: true
                  }
                ]
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const Info = () => {
  const { selectedSensorId, dateRange, onDateRangeChange } =
    useContext(AppContext)
  return (
    <div className="relative h-[80dvh] w-[30dvw] calcite-box ">
      {selectedSensorId ? (
        <Operator sensorId={selectedSensorId} />
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default Info
