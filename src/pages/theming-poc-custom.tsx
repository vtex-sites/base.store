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
import Toggle from '../components/ui/Toggle'
import QuantitySelector from '../components/ui/QuantitySelector'
import Badge from '../components/ui/Badge'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'

import '../styles/theming-poc.scss'
import '../styles/theming-poc-custom.scss'

export type Props = PageProps<HomePageQueryQuery>

function Page(props: Props) {
  const {
    data: { allStoreProduct },
  } = props

  const theme = ''

  const products = useMemo(() => allStoreProduct?.nodes, [allStoreProduct])

  return (
    <>
      <GatsbySeo
        title="UI Theming: Proof of Concept"
        language="en"
        noindex
        nofollow
      />
      <div className="theming-poc-custom">
        <article className="theming-toggle">
          <Toggle classes={theme} />
        </article>
        <article className="theming-select">
          <Select classes={theme} />
        </article>
        <article className="theming-quantity-selector">
          <QuantitySelector classes={theme} min={1} max={10} disabled={false} />
        </article>
        <article className="theming-badge">
          <div className="theming-poc-list">
            <Badge classes={theme} variant="success" small>
              success
            </Badge>
            <Badge classes={theme} variant="highlighted" small>
              highlighted
            </Badge>
            <Badge classes={theme} variant="info" small>
              info
            </Badge>
            <Badge classes={theme} variant="neutral" small>
              neutral
            </Badge>
            <Badge classes={theme} variant="promo" small>
              promo
            </Badge>
          </div>
        </article>
        <article className="theming-button">
          <div className="theming-poc-list">
            <div className={`theming-poc-list ${theme}`}>
              <Button
                variant="primary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
              >
                Primary
              </Button>
              <Button variant="secondary" classes={theme}>
                Secondary
              </Button>
              <Button
                variant="tertiary"
                icon={<BellRingingIcon size={18} weight="bold" />}
                iconPosition="left"
              >
                Tertiary
              </Button>
            </div>
          </div>
        </article>
        <article className="theming-button">
          <div className="theming-poc-list theme-button-1">
            <div className={`theming-poc-list inverse ${theme}`}>
              <Button
                variant="primary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
                inverse
              >
                Primary
              </Button>
              <Button variant="secondary" inverse>
                Secondary
              </Button>
              <Button
                variant="tertiary"
                icon={<BellRingingIcon size={18} weight="bold" />}
                iconPosition="left"
                inverse
              >
                Tertiary
              </Button>
            </div>
          </div>
        </article>
        <article className="theming-product-card">
          <div className="theming-poc-list">
            <ProductCard
              product={products[3] ?? {}}
              index={1}
              action="button"
              classes={theme}
              badgeVariant="highlighted"
            />
          </div>
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
