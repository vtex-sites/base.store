import './section.scss'

import React from 'react'
import type { PropsWithChildren } from 'react'

interface Props {
  variant?: 'default' | 'divisor'
}

function Section({ children, variant = 'default' }: PropsWithChildren<Props>) {
  return (
    <section data-store-section data-variant={variant} className="section">
      {children}
    </section>
  )
}

export default Section
