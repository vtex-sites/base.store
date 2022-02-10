import React from 'react'
import { Link as UILink } from '@faststore/ui'
import type { LinkProps } from '@faststore/ui'
import { Link as GatsbyLink } from 'gatsby'

import './link.scss'

type Variant = 'default' | 'display' | 'inline' | 'footer'

type Props = LinkProps<typeof GatsbyLink> & {
  variant?: Variant
  inverse?: boolean
}

function Link({ variant = 'default', inverse, ...props }: Props) {
  return (
    <UILink
      as={GatsbyLink}
      data-link-variant={variant}
      data-link-inverse={inverse}
      {...props}
    />
  )
}

export default Link
