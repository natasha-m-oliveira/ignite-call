import { ReactNode } from 'react'
import { TimePickerItem } from './CalendarTimePickItem.styles'

interface CalendarTimePickerItemProps {
  children: ReactNode
}

export function CalendarTimePickerItem({
  children,
}: CalendarTimePickerItemProps) {
  return <TimePickerItem>{children}</TimePickerItem>
}
