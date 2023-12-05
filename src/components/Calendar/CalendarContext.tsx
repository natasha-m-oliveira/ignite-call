import dayjs, { Dayjs } from 'dayjs'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

interface CalendarContextProps {
  selectedDate: Date | null
  setSelectedDate: (value: Date | null) => void
  currentDate: Dayjs
  setCurrentDate: (value: Dayjs) => void
}

interface CalendarWeek {
  week: number
  days: Array<{
    date: Dayjs
    disabled: boolean
  }>
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

export const useCalendarWeeks = (date: Dayjs) => {
  const computeCalendarWeeks = () => {
    if (!date) return []

    const daysInMonthArray = Array.from({ length: date.daysInMonth() }).map(
      (_, i) => ({
        date: date.set('date', i + 1),
        disabled: false,
      }),
    )

    const firstWeekDay = date.get('day')

    const previousMonthFillArray = Array.from({ length: firstWeekDay }).map(
      (_, i) => ({
        date: date.subtract(firstWeekDay - i, 'day'),
        disabled: true,
      }),
    )

    const lastDayInCurrentMonth = date.set('date', date.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => ({
      date: lastDayInCurrentMonth.add(i + 1, 'day'),
      disabled: true,
    }))

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ]

    const calendarWeeks: CalendarWeek[] = []

    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push({
        week: i / 7,
        days: calendarDays.slice(i, i + 7),
      })
    }

    return calendarWeeks
  }

  return useMemo(computeCalendarWeeks, [date])
}

export const useCalendarContext = () => {
  const { selectedDate, setSelectedDate, currentDate, setCurrentDate } =
    useContext(CalendarContext)

  const isDateSelected = !!selectedDate

  const currentMonth = currentDate?.format('MMMM')
  const currentYear = currentDate?.format('YYYY')

  const calendarWeeks = useCalendarWeeks(currentDate)

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
    currentMonth,
    currentYear,
    calendarWeeks,
    isDateSelected,
    handlePreviousMonth,
    handleNextMonth,
  }
}
