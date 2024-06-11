import { createContext, useState } from 'react'
import { DateValueType } from 'react-tailwindcss-datepicker'

interface IAppContext {
  selectedSensorId: string | undefined
  onSelectSensor: (sensorId: string) => void

  dateRange: DateValueType
  onDateRangeChange: (dateRange: DateValueType) => void
}

export const AppContext = createContext<IAppContext>({
  selectedSensorId: undefined,
  onSelectSensor: () => {},

  dateRange: {
    startDate: new Date(),
    endDate: new Date()
  },
  onDateRangeChange: () => {}
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSensorId, setselectedSensorId] = useState<string | undefined>(
    undefined
  )
  const [dateRange, setValue] = useState<DateValueType>({
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-02')
  })

  const handleValueChange = (newValue: DateValueType) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <AppContext.Provider
      value={{
        selectedSensorId,
        onSelectSensor: (value) => {
          setselectedSensorId(value)
        },

        dateRange,
        onDateRangeChange: (value) => {
          handleValueChange(value)
        }
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
