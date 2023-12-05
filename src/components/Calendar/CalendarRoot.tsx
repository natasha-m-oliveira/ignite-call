import { ReactNode } from 'react'
import { Container } from './CalendarRoot.styles'
import { CalendarContextProvider, useCalendarContext } from './CalendarContext'

interface CalendarRootProps {
  children: ReactNode
}

export function CalendarRoot({ children }: CalendarRootProps) {
  const { isDateSelected } = useCalendarContext()
  return (
    <CalendarContextProvider>
      <Container isTimePickerOpen={isDateSelected}>{children}</Container>
    </CalendarContextProvider>
  )
}
