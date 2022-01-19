import React, { useRef } from 'react'
import { gql } from '@vtex/graphql-utils'
import type { ShippingQuery, ShippingQueryVariables } from '@generated/graphql'

import { useQuery } from '../sdk/graphql/useQuery'

const query = gql`
  query Shipping($name: String!) {
    shipping(name: $name)
  }
`

export default function MyComponent() {
  const ref = useRef(Math.random())
  const name = `My number is: ${ref.current}`

  const { data } = useQuery<ShippingQuery, ShippingQueryVariables>(
    query,
    {
      name,
    },
    { revalidateOnMount: true }
  )

  if (!data) {
    return null
  }

  return <div>{data.shipping}</div>
}
