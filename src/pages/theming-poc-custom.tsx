import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { PageProps } from 'gatsby'
import type {
  HomePageQueryQuery,
  // ProductSummary_ProductFragment,
} from '@generated/graphql'
import {
  BellRinging as BellRingingIcon,
  ArrowRight as ArrowRightIcon,
} from 'phosphor-react'

import ProductCard from '../components/product/ProductCard'
import InputToggle from '../components/ui/InputToggle'
import QuantitySelector from '../components/ui/QuantitySelector'
import Badge from '../components/ui/Badge'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'

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
        <article className="theming-poc-content theming-toggle">
          <main>
            <h3>Toggle</h3>
            <InputToggle classes="theme-1" />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-select">
          <main>
            <h3>Select</h3>
            <Select classes="theme-1" />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-quantity-selector">
          <main>
            <h3>Quantity Selector</h3>
            <QuantitySelector
              classes="theme-1"
              min={1}
              max={10}
              disabled={false}
            />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-badge">
          <main>
            <h3>Badges</h3>
            <div className="theming-poc-list">
              <Badge classes="theme-1" variant="success" small>
                success
              </Badge>
              <Badge classes="theme-1" variant="highlighted" small>
                highlighted
              </Badge>
              <Badge classes="theme-1" variant="info" small>
                info
              </Badge>
              <Badge classes="theme-1" variant="neutral" small>
                neutral
              </Badge>
              <Badge classes="theme-1" variant="promo" small>
                promo
              </Badge>
            </div>
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-button">
          <main>
            <h3>Buttons</h3>
            <div className="theming-poc-list theme-button-1">
              <div className="theming-poc-list">
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon size={18} weight="bold" />}
                  iconPosition="right"
                  classes="theme-1"
                >
                  Primary
                </Button>
                <Button variant="secondary" classes="theme-1">
                  Secondary
                </Button>
                <Button
                  variant="tertiary"
                  icon={<BellRingingIcon size={18} weight="bold" />}
                  iconPosition="left"
                  classes="theme-1"
                >
                  Tertiary
                </Button>
              </div>
              <div
                className="theming-poc-list -inverse"
                style={{ backgroundColor: '#5900c8', padding: '10px' }}
              >
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon size={18} weight="bold" />}
                  iconPosition="right"
                  classes="theme-1"
                  inverse
                >
                  Primary
                </Button>
                <Button variant="secondary" classes="theme-1" inverse>
                  Secondary
                </Button>
                <Button
                  variant="tertiary"
                  icon={<BellRingingIcon size={18} weight="bold" />}
                  iconPosition="left"
                  classes="theme-1"
                  inverse
                >
                  Tertiary
                </Button>
              </div>
            </div>
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-product-card">
          <main>
            <h3>Product Card</h3>
            <div className="theming-poc-list">
              <ProductCard
                product={products[1] ?? {}}
                index={1}
                structure="wide"
                badgeVariant="highlighted"
                classes="theme-1"
              />
            </div>
          </main>
        </article>
      </div>
    </>
  )
}

export const query = graphql`
  query JustAnotherHomePageQuery {
    allStoreProduct(limit: 10) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

export default Page
