import React from 'react'

import './sr-only.scss'

interface Props {
  text: string
}

function SROnly({ text }: Props) {
  return <span data-store-sr-only>{text}</span>
}

export default SROnly
