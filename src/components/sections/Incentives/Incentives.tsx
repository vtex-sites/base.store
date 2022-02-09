import React from 'react'
import type { ReactNode } from 'react'
import { Incentive as UIIncentive, List as UIList } from '@faststore/ui'

import './incentives.scss'

interface Incentive {
  icon: ReactNode
  title?: string
  firstLineText: string
  secondLineText?: string
}

interface Props {
  incentives: Incentive[]
  classes?: string
  colored?: boolean
}

function Incentives({ incentives, colored, classes = '' }: Props) {
  return (
    <div
      data-base-incentives="true"
      data-base-incentives-colored={colored}
      className={`incentives ${classes} / grid-content-full`}
    >
      <UIList variant="unordered" className="grid-content">
        {incentives.map((incentive, index) => (
          <li key={String(index)}>
            <UIIncentive>
              {incentive.icon}
              <div data-incentive-content>
                {incentive.title && <p>{incentive.title}</p>}
                <span>{incentive.firstLineText}</span>
                {incentive.secondLineText && (
                  <span>{incentive.secondLineText}</span>
                )}
              </div>
            </UIIncentive>
          </li>
        ))}
      </UIList>
    </div>
  )
}

export default Incentives
