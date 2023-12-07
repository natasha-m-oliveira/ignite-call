import { Header } from './styles'
import { ReactNode } from 'react'

interface TimePickerHeaderProps {
  children: ReactNode
}

export function TimePickerHeader({ children }: TimePickerHeaderProps) {
  return <Header>{children}</Header>
}
