import { ButtonHTMLAttributes } from 'react'
import { TimePickerItem } from './CalendarTimePickItem.styles'

type CalendarTimePickerItemProps = ButtonHTMLAttributes<HTMLButtonElement>

export function CalendarTimePickerItem({
  children,
  ...rest
}: CalendarTimePickerItemProps) {
  return <TimePickerItem {...rest}>{children}</TimePickerItem>
}
