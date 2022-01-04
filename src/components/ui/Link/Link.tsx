import React from 'react'
import { Link as UILink } from '@faststore/ui'
import type { LinkProps } from '@faststore/ui'

import './link.scss'

type Variant = 'default' | 'display' | 'inline' | 'footer'

type Props = LinkProps<'a'> & {
  variant?: Variant
  inverse?: boolean
}

function Link({ variant = 'default', inverse, ...props }: Props) {
  return (
    <UILink
      data-link-variant={variant}
      data-link-inverse={inverse}
      {...props}
    />
  )
}

export default Link
