import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarBody,
  CalendarDay,
  CalendarHeader,
  CalendarActions,
  CalendarTitle,
  CalendarContainer,
} from './CalendarTable.styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useCalendarContext } from './CalendarContext'

interface CalendarTableProps {
  selectedDate?: Date | null
  onDateSelected?: (date: Date) => void
}

export function CalendarTable(props: CalendarTableProps) {
  const {
    currentYear,
    currentMonth,
    calendarWeeks,
    handleNextMonth,
    handlePreviousMonth,
  } = useCalendarContext()

  const shortWeekDays = getWeekDays({ short: true })

  console.log(calendarWeeks)

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay disabled={disabled}>
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
