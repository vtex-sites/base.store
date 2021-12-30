import React from 'react'
import type { ReactNode } from 'react'
import { Incentive, List } from '@faststore/ui'

interface Props {
  incentives: ReactNode[]
}

function Incentives({ incentives }: Props) {
  return (
    <List variant="unordered">
      {incentives.map((incentive, index) => (
        <li key={String(index)}>
          <Incentive>{incentive}</Incentive>
        </li>
      ))}
    </List>
  )
}

export default Incentives
