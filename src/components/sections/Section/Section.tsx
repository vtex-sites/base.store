import React from 'react'
import type { PropsWithChildren } from 'react'

import * as style from './section.module.scss'

interface Props {
  className?: string
}

function Section({ children, className = '' }: PropsWithChildren<Props>) {
  return (
    <section className={`${style.section} ${className}`}>{children}</section>
  )
}

export default Section
