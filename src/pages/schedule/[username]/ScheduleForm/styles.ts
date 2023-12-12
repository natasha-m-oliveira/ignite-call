import * as Popover from '@radix-ui/react-popover'
import { Box, Text, keyframes, styled } from '@ignite-ui/react'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const PopoverContent = styled(Box, {
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})

export const PopoverClose = styled(Popover.Close, {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray200',
  position: 'absolute',
  top: 5,
  right: 5,

  '&:hover': { backgroundColor: '$gray600', opacity: 0.8 },
  '&:focus': { boxShadow: `0 0 0 2px $gray200` },
})

export const PopoverArrow = styled(Popover.Arrow, {
  fill: '$gray800',
})

export const AddressPreview = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$2',

  marginTop: '$4',

  [`> ${Text}, > svg`]: {
    color: '$gray200',
    textWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  button: {
    all: 'unset',
    cursor: 'pointer',
  },
})

export const AddressForm = styled('form', {
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    '> div': {
      display: 'flex',
      gap: '$2',

      '> button': {
        minWidth: 'min-content',
      },
    },
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
