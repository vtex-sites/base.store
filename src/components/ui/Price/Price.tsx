import React from 'react'
import { Price as UIPrice } from '@faststore/ui'
import type { PriceProps } from '@faststore/ui'

import './price.scss'

type Props = PriceProps & {
  // other classes
  classes?: string
}

function Price({ classes, ...props }: Props) {
  return <UIPrice className={`price ${classes}`} {...props} />
}

export default Price
