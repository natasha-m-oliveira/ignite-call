import { ReactNode } from 'react'
import { Container } from './styles'

interface TimePickerRootProps {
  children: ReactNode
}

export function TimePickerRoot({ children }: TimePickerRootProps) {
  return <Container>{children}</Container>
}
