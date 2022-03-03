import './Section.scss'

import React from 'react'
import type { PropsWithChildren } from 'react'

function Section({ children }: PropsWithChildren<unknown>) {
  return <section className="pages__section">{children}</section>
}

export default Section
