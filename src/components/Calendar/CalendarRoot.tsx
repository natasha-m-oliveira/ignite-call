import { ReactNode, createContext } from 'react'
import { Container } from './CalendarRoot.styles'

interface CalendarRootProps {
  children: ReactNode
  isTimePickerOpen?: boolean
}

const CalendarContext = createContext(null)

export function CalendarRoot({
  children,
  isTimePickerOpen = false,
}: CalendarRootProps) {
  return (
    <CalendarContext.Provider value={null}>
      <Container isTimePickerOpen={isTimePickerOpen}>{children}</Container>
    </CalendarContext.Provider>
  )
}
