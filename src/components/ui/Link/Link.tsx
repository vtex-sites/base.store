import React from 'react'
import { Link as UILink } from '@faststore/ui'
import type { LinkProps } from '@faststore/ui'

type Props = LinkProps<'a'>

function Link(props: Props) {
  return <UILink {...props} />
}

export default Link
