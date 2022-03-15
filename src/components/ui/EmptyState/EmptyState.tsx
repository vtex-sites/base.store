import React from 'react'
import type { PropsWithChildren } from 'react'

import './empty-state.scss'

function EmptyState({ children }: PropsWithChildren<unknown>) {
  return (
    <section className="empty-state" data-empty-state>
      {children}
    </section>
  )
}

export default EmptyState
