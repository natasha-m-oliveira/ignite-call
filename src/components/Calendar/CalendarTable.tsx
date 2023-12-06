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
  blockedDates?: Date[]
  onDateSelected?: (date: Date | null) => void
}

export function CalendarTable(props: CalendarTableProps) {
  const { onDateSelected = () => undefined } = props

  const {
    currentYear,
    currentMonth,
    calendarWeeks,
    handleNextMonth,
    handlePreviousMonth,
  } = useCalendarContext()

  const shortWeekDays = getWeekDays({ short: true })

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
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay>
                        <input
                          type="radio"
                          name="calendar-date"
                          disabled={disabled}
                          onClick={() => onDateSelected(date.toDate())}
                        />
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
