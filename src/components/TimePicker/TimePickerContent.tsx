import { ReactNode } from 'react'
import { List } from './styles'

interface TimePickerContentProps {
  children: ReactNode
}

export function TimePickerContent({ children }: TimePickerContentProps) {
  return <List>{children}</List>
}
