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
}

function Incentives({ incentives }: Props) {
  return (
    <UIList variant="unordered" className="incentives">
      {incentives.map((incentive, index) => (
        <li key={String(index)}>
          <UIIncentive>
            {incentive.icon}
            <div data-incentives-content>
              {incentive.title && <p>{incentive.title}</p>}
              <span>{incentive.text}</span>
            </div>
          </UIIncentive>
        </li>
      ))}
    </UIList>
  )
}

export default Incentives
