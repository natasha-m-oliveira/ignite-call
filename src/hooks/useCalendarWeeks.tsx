import dayjs from 'dayjs'
import { useMemo } from 'react'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

export const useCalendarWeeks = (
  date: dayjs.Dayjs,
  blockedWeekDays: number[],
  blockedDates: number[],
) => {
  const computeCalendarWeeks = () => {
    if (!date) return []

    const daysInMonthArray = Array.from({ length: date.daysInMonth() }).map(
      (_, i) => ({
        date: date.set('date', i + 1),
        disabled:
          date
            .set('date', i + 1)
            .endOf('day')
            .isBefore(new Date()) ||
          blockedWeekDays.includes(date.set('date', i + 1).get('day')) ||
          blockedDates.includes(date.set('date', i + 1).get('date')),
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

  return useMemo(computeCalendarWeeks, [date, blockedDates, blockedWeekDays])
}
