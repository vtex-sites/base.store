import React, { useMemo } from 'react'
import Slider from 'src/components/ui/Slider'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import type { SlidersPageQueryQuery } from '@generated/graphql'

export type Props = PageProps<SlidersPageQueryQuery>

function Page(props: Props) {
  const {
    data: { allStoreProduct },
  } = props

  const products = useMemo(() => allStoreProduct?.nodes, [allStoreProduct])

  return (
    <>
      <section className="page__section / grid-section grid-content">
        <h1>React Slick</h1>

        <p>Total: 10 | Show: 3</p>
        <Slider products={products.slice(0, 10)} />
        <br />
        <br />

        <p>Total: 3 | Show: 3</p>
        <Slider show={3} products={products.slice(3, 6)} />
      </section>
    </>
  )
}

export const query = graphql`
  query SlidersPageQuery {
    allStoreProduct(limit: 14) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
