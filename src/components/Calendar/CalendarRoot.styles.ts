import { Box, styled } from '@ignite-ui/react'
import { TimePicker } from './CalendarTimePicker.styles'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  '&:has([data-state="open"]):focus-within': {
    gridTemplateColumns: '1fr 280px',

    '@media(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },

  '&:has([data-state="closed"]), &:not(:focus-within)': {
    maxWidth: 540,
    gridTemplateColumns: '1fr',
  },

  [`&:not(:focus-within) ${TimePicker}`]: {
    display: 'none',
  },
})
