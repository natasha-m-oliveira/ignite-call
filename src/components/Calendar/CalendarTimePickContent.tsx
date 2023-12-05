import { ReactNode } from 'react'
import { TimePickerContent } from './CalendarTimePickContent.styles'

interface CalendarTimePickerContentProps {
  children: ReactNode
}

export function CalendarTimePickerContent({
  children,
}: CalendarTimePickerContentProps) {
  return <TimePickerContent>{children}</TimePickerContent>
}
