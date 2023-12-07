import { ReactNode } from 'react'
import { Actions } from './styles'

interface CalendarActionsProps {
  children: ReactNode
}

export function CalendarActions({ children }: CalendarActionsProps) {
  return <Actions>{children}</Actions>
}
