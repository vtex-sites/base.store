import React from 'react'
import type { ReactNode } from 'react'
import { Incentive } from '@faststore/ui'

interface Props {
  incentives: ReactNode[]
}

function Incentives({ incentives }: Props) {
  return (
    <ul>
      {incentives.map((incentive, index) => (
        <li key={String(index)}>
          <Incentive>{incentive}</Incentive>
        </li>
      ))}
    </ul>
  )
}

export default Incentives
