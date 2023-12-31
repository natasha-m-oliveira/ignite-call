import { ReactNode } from 'react'
import { Container } from './styles'

interface CalendarRootProps {
  children: ReactNode
}

export function CalendarRoot({ children }: CalendarRootProps) {
  return <Container>{children}</Container>
}
