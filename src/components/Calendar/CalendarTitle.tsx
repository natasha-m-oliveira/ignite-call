import { ReactNode } from 'react'
import { Title } from './styles'

interface CalendarTitleProps {
  children: ReactNode
}

export function CalendarTitle({ children }: CalendarTitleProps) {
  return <Title>{children}</Title>
}
