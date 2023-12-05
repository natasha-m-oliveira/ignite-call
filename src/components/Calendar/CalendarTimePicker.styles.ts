import { styled } from '@ignite-ui/react'

export const TimePicker = styled('div', {
  '&[data-state="open"]': {
    borderLeft: '1px solid $gray600',
    padding: '$6 $6 0',
    overflowY: 'scroll',
    background: 'none',

    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 280,
  },
  '&[data-state="close"]': {
    display: 'none',
  },
})
