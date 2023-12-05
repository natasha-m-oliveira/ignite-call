import dayjs, { Dayjs } from 'dayjs'
import { ReactNode, createContext, useContext, useState } from 'react'

interface CalendarContextProps {
  selectedDate: Date | null
  setSelectedDate: (value: Date | null) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
}

const DEFAULT_VALUE = {} as CalendarContextProps

const CalendarContext = createContext<CalendarContextProps>(DEFAULT_VALUE)

export const CalendarContextProvider = (props: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        currentDate,
        setCurrentDate,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  )
}

export const useCalendarContext = () => {
  const { selectedDate, setSelectedDate, currentDate, setCurrentDate } =
    useContext(CalendarContext)

  const isDateSelected = !!selectedDate

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  return {
    currentDate,
    isDateSelected,
    handlePreviousMonth,
    handleNextMonth,
  }
}
