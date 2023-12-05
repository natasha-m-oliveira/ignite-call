import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarBody,
  Day,
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
  const { currentDate, handleNextMonth, handlePreviousMonth } =
    useCalendarContext()

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Day disabled>1</Day>
            </td>
            <td>
              <Day>2</Day>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
