import { ReactNode } from 'react'
import { TimePicker } from './CalendarTimePicker.styles'

interface CalendarTimePickerProps {
  children: ReactNode
}

export function CalendarTimePicker({ children }: CalendarTimePickerProps) {
  return <TimePicker>{children}</TimePicker>
}
