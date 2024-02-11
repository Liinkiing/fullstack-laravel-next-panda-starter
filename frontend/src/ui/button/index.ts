import type { ComponentProps } from 'react'

import { styled } from '~/styled-system/jsx'
import { button } from '~/styled-system/recipes'

export const Button = styled('button', button, {
  defaultProps: {
    type: 'button',
  },
})
export interface ButtonProps extends ComponentProps<typeof Button> {}
