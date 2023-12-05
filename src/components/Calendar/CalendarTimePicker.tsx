import { ReactNode } from 'react'
import { TimePicker } from './CalendarTimePicker.styles'
import { useCalendarContext } from './CalendarContext'

interface CalendarTimePickerProps {
  children: ReactNode
}

export function CalendarTimePicker({ children }: CalendarTimePickerProps) {
  const { isDateSelected } = useCalendarContext()

  return (
    <TimePicker data-state={isDateSelected ? 'open' : 'closed'}>
      {children}
    </TimePicker>
  )
}
