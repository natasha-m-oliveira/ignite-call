import { ReactNode } from 'react'
import { Container } from './CalendarRoot.styles'
import { CalendarContextProvider } from './CalendarContext'

interface CalendarRootProps {
  children: ReactNode
}

export function CalendarRoot({ children }: CalendarRootProps) {
  return (
    <CalendarContextProvider>
      <Container>{children}</Container>
    </CalendarContextProvider>
  )
}
