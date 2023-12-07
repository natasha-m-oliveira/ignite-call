import * as TimePicker from '@/components/TimePicker/styles'
import { fadeInRight } from '@/styles/global'
import { Box, styled } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  transition: '1s',

  '&:has(input[type="radio"]:checked)': {
    gridTemplateColumns: '1fr 280px',

    [`${TimePicker.Container}`]: {
      animation: `${fadeInRight} 1s both`,
    },

    '@media(max-width: 900px)': {
      gridTemplateColumns: '1fr 0px',
    },
  },

  '&:not(:has(input[type="radio"]:checked))': {
    maxWidth: 540,
    gridTemplateColumns: '1fr 0px',

    [`${TimePicker.Container}`]: {
      display: 'none',
    },
  },
})
