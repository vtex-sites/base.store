import type { ElementType } from 'react'
import React from 'react'

import './sr-only.scss'

interface Props {
  text: string
  as?: ElementType
}

function SROnly({ text, as }: Props) {
  const Component = as ?? 'span'

  return <Component data-store-sr-only>{text}</Component>
}

export default SROnly
