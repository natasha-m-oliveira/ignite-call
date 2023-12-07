import { CaretRight } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'

type CalendarNextProps = ButtonHTMLAttributes<HTMLButtonElement>

export function CalendarNext(props: CalendarNextProps) {
  return (
    <button {...props} title="Next month">
      <CaretRight />
    </button>
  )
}
