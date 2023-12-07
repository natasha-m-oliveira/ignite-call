import { ButtonHTMLAttributes } from 'react'
import { Item } from './styles'

type TimePickerItemProps = ButtonHTMLAttributes<HTMLButtonElement>

export function TimePickerItem({ children, ...rest }: TimePickerItemProps) {
  return <Item {...rest}>{children}</Item>
}
