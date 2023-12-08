import { useCalendarWeeks } from '@/hooks/useCalendarWeeks'
import { Day, Table } from './styles'
import dayjs from 'dayjs'

interface CalendarTableProps {
  currentDate: Date
  blockedDays?: {
    blockedWeekDays: number[]
    blockedDates: number[]
  }
  weekDays: string[]
  onDateSelected?: (date: Date | null) => void
}

export function CalendarTable(props: CalendarTableProps) {
  const {
    weekDays,
    currentDate,
    blockedDays,
    onDateSelected = () => undefined,
  } = props

  const calendarWeeks = useCalendarWeeks(dayjs(currentDate), blockedDays)

  return (
    <Table>
      <thead>
        <tr>
          {weekDays.map((weekDay) => (
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
                    <Day>
                      <input
                        type="radio"
                        name="calendar-date"
                        disabled={disabled}
                        onClick={() => onDateSelected(date.toDate())}
                      />
                      {date.get('date')}
                    </Day>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
