import { Link as UILink } from '@faststore/ui'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import type { ElementType } from 'react'
import type { LinkProps } from '@faststore/ui'

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
      data-fs-link
      data-fs-link-variant={variant}
      data-fs-link-inverse={inverse}
      to={to}
      {...props}
    />
  )
}

export default Link
