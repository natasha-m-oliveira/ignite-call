import { globalCss, keyframes } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})

export const fadeInRight = keyframes({
  from: {
    opacity: 0,
    transform: 'translatex(10px)',
    zIndex: '-1',
  },
  to: {
    opacity: 1,
    transform: 'translatex(0)',
    zIndex: '0',
  },
})

export const fadeOutRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translatex(0)',
  },
  to: {
    opacity: 0,
    transform: 'translatex(10px)',
  },
})
