import { ReactNode } from 'react'
import { Header } from './styles'

interface CalendarHeaderProps {
  children: ReactNode
}

export function CalendarHeader({ children }: CalendarHeaderProps) {
  return <Header>{children}</Header>
}
