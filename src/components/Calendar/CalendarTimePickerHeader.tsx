import dayjs from 'dayjs'
import { useCalendarContext } from './CalendarContext'
import { TimePickerHeader } from './CalendarTimePickerHeader.styles'

export function CalendarTimePickerHeader() {
  const { selectedDate } = useCalendarContext()

  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const dayAndMonth = selectedDate && dayjs(selectedDate).format('DD[ de ]MMMM')

  return (
    <TimePickerHeader>
      {weekDay} <span>{dayAndMonth}</span>
    </TimePickerHeader>
  )
}
