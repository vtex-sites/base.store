import React from 'react'
import { Link as UILink } from '@faststore/ui'
import type { LinkProps } from '@faststore/ui'

import './link.scss'

type Props = LinkProps<'a'> & {
  inverse?: boolean
}

function Link({ inverse, ...props }: Props) {
  return <UILink data-link-inverse={inverse} {...props} />
}

export default Link
