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
      <GatsbySeo
        title="UI Theming: Proof of Concept"
        language="en"
        noindex
        nofollow
      />
      <div className="theming-poc">
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
            <h3>Design Tokens</h3>
            <code>toggle-bkg-color-active</code>
            <code>toggle-bkg-color</code>
            <br />
            <code>toggle-border-color-active</code>
            <code>toggle-border-color</code>
            <code>toggle-border-radius</code>
            <code>toggle-border-style</code>
            <code>toggle-border-width</code>
            <br />
            <code>toggle-height-desk</code>
            <code>toggle-height-mob</code>
            <code>toggle-height</code>
            <br />
            <code>toggle-knob-border-color-active</code>
            <code>toggle-knob-border-color</code>
            <code>toggle-knob-color-active</code>
            <code>toggle-knob-color</code>
            <code>toggle-knob-radius</code>
            <code>toggle-knob-shadow</code>
            <br />
            <code>toggle-transition-function</code>
            <code>toggle-transition-property</code>
            <code>toggle-transition-timing</code>
          </aside>
        </div>
        <hr />
        <div className="theming-poc-content">
          <ProductCard
            product={products[0] ?? {}}
            index={0}
            action="quantitySelector"
            select
            moreInfo
          />
          <ProductCard product={products[1] ?? {}} index={1} structure="wide" />
          <ProductCard
            product={products[2] ?? {}}
            index={1}
            structure="horizontal"
            ratio="3:4"
            showDescription
          />
          <ProductCard product={products[3] ?? {}} index={1} />
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
