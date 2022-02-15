import type { ElementType } from 'react'
import React from 'react'
import { Link as UILink } from '@faststore/ui'
import type { LinkProps } from '@faststore/ui'
import { Link as GatsbyLink } from 'gatsby'

import './link.scss'

type Variant = 'default' | 'display' | 'inline' | 'footer'

type Props<T extends ElementType = typeof GatsbyLink> = LinkProps<T> & {
  variant?: Variant
  inverse?: boolean
}

function Link<T extends ElementType = typeof GatsbyLink>({
  variant = 'default',
  inverse,
  to,
  ...props
}: Props<T>) {
  return (
    <UILink
      as={GatsbyLink}
      data-link-variant={variant}
      data-link-inverse={inverse}
      to={to}
      {...props}
    />
  )
}

export default Link
