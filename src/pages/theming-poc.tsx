import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { PageProps } from 'gatsby'
import type {
  HomePageQueryQuery,
  // ProductSummary_ProductFragment,
} from '@generated/graphql'

import ProductCard from '../components/product/ProductCard'
import InputToggle from '../components/ui/InputToggle'

import '../styles/theming-poc.scss'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { allStoreProduct },
  } = props

  const products = useMemo(() => allStoreProduct?.nodes, [allStoreProduct])

  return (
    <>
      <div className="theming-poc">
        <GatsbySeo
          title="UI Theming: Proof of Concept"
          language="en"
          noindex
          nofollow
        />
        <div className="theming-poc-content theming-toggle">
          <header />
          <main>
            <InputToggle />
            <InputToggle />
            <InputToggle />
            <InputToggle />
            <InputToggle />
          </main>
          <aside>
            <h3>Elements</h3>
            <code>bkg (background)</code>
            <code>border</code>
            <code>knob</code>
          </aside>
          <aside>
            <h3>Design Tokens</h3>
            <code>border-style</code>
            <code>border-width</code>
            <br />
            <code>color-bkg-active</code>
            <code>color-bkg</code>
            <code>color-border-active-knob</code>
            <code>color-border-active</code>
            <code>color-border-knob</code>
            <code>color-border</code>
            <code>color-knob-active</code>
            <code>color-knob</code>
            <code>color-focus</code>
            <br />
            <code>height-desk</code>
            <code>height-mob</code>
            <br />
            <code>radius-knob</code>
            <code>radius</code>
            <br />
            <code>shadow-knob</code>
            <br />
            <code>transition-function</code>
            <code>transition-property</code>
            <code>transition-timing</code>
          </aside>
        </div>
        <div className="theming-poc-content">
          <ProductCard
            product={products[0] ?? {}}
            index={0}
            showActions={false}
          />
          <ProductCard
            product={products[1] ?? {}}
            index={1}
            showActions={false}
          />
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query AnotherHomePageQuery {
    allStoreProduct(limit: 10) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
