import { Box, styled } from '@ignite-ui/react'
import { TimePicker } from './CalendarTimePicker.styles'
import { fadeInRight, fadeOutRight } from '@/styles/global'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  transition: '1s',

  '&:has(input[type="radio"]:checked)': {
    gridTemplateColumns: '1fr 280px',

    [`${TimePicker}`]: {
      animation: `${fadeInRight} 1s both`,
    },

    '@media(max-width: 900px)': {
      gridTemplateColumns: '1fr 0px',
    },
  },

  '&:not(:has(input[type="radio"]:checked))': {
    maxWidth: 540,
    gridTemplateColumns: '1fr 0px',

    [`${TimePicker}`]: {
      display: 'none',
    },
  },
})
