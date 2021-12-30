import React from 'react'
import type { ReactNode } from 'react'
import { Incentive as UIIncentive, List as UIList } from '@faststore/ui'

import './incentives.scss'

interface Incentive {
  icon: ReactNode
  title?: string
  text: string
}

interface Props {
  incentives: Incentive[]
  hasBackground?: boolean
}

function Incentives({ incentives, hasBackground }: Props) {
  return (
    <div
      className="incentives / grid-content-full"
      data-incentives-background={hasBackground}
    >
      <UIList variant="unordered" className="grid-content">
        {incentives.map((incentive, index) => (
          <li key={String(index)}>
            <UIIncentive>
              {incentive.icon}
              <div data-incentive-content>
                {incentive.title && <p>{incentive.title}</p>}
                <span>{incentive.text}</span>
              </div>
            </UIIncentive>
          </li>
        ))}
      </UIList>
    </div>
  )
}

export default Incentives
