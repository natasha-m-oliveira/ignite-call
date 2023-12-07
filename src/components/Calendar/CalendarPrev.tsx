import { CaretLeft } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'

type CalendarPrevProps = ButtonHTMLAttributes<HTMLButtonElement>

export function CalendarPrev(props: CalendarPrevProps) {
  return (
    <button {...props} title="Previous month">
      <CaretLeft />
    </button>
  )
}
