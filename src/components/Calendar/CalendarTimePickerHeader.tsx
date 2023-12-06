import dayjs from 'dayjs'
import { TimePickerHeader } from './CalendarTimePickerHeader.styles'

interface CalendarTimePickerHeaderProps {
  date: Date | null
}

export function CalendarTimePickerHeader({
  date,
}: CalendarTimePickerHeaderProps) {
  const weekDay = date && dayjs(date).format('dddd')
  const dayAndMonth = date && dayjs(date).format('DD[ de ]MMMM')

  return (
    <TimePickerHeader>
      {weekDay} <span>{dayAndMonth}</span>
    </TimePickerHeader>
  )
}
