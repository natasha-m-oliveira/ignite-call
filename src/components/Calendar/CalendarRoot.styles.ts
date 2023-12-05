import { Box, styled } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  '&:has([data-state="open"])': {
    gridTemplateColumns: '1fr 280px',

    '@media(max-width: 900px)': {
      gridTemplateColumns: '1fr',
    },
  },

  '&:has([data-state="closed"])': {
    maxWidth: 540,
    gridTemplateColumns: '1fr',
  },
})
