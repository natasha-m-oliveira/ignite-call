import { Text, styled } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',

  span: {
    color: '$gray200',
  },
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize: '$sm',
  },

  'tbody:before': {
    content: '.',
    lineHeight: '0.75rem',
    display: 'block',
    color: '$gray800',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})

export const CalendarDay = styled('label', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1/1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  position: 'relative',

  '> input[type="radio"]': {
    position: 'absolute',
    height: '1px',
    width: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clipPath: 'rect(0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },

  '&:has(input[type="radio"]:disabled)': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:has(input[type="radio"]:not(:disabled)):hover': {
    background: '$gray500',
  },

  '&:has(input[type="radio"]:focus)': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:has(input[type="radio"]:checked)::before': {
    content: '',
    width: 4,
    height: 4,
    background: '$gray100',
    borderRadius: '$full',
    position: 'absolute',
    bottom: '15%',
  },
})
