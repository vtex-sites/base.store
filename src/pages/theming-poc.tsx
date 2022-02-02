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
          <section>
            <h3>Layouts</h3>
            <Toggle structure="horizontal" />
            <Toggle structure="vertical" />
          </section>
          <main>
            <h3>Theme 1</h3>
            <Toggle classes="theme-1" />
            <h3>Theme 2</h3>
            <Toggle classes="base-store" />
            <h3>Theme 3</h3>
            <Toggle classes="theme-3" />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-select">
          <section>
            <h3>Layout</h3>
            <Select />
          </section>
          <main>
            <h3>Theme 1</h3>
            <Select classes="theme-1" />
            <h3>Theme 2</h3>
            <Select classes="base-store" />
            <h3>Theme 3</h3>
            <Select classes="theme-3" />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-quantity-selector">
          <section>
            <h3>Layout</h3>
            <QuantitySelector min={1} max={10} disabled={false} />
          </section>
          <main>
            <h3>Theme 1</h3>
            <QuantitySelector
              classes="theme-1"
              min={1}
              max={10}
              disabled={false}
            />
            <h3>Theme 2</h3>
            <QuantitySelector
              classes="base-store"
              min={1}
              max={10}
              disabled={false}
            />
            <h3>Theme 3</h3>
            <QuantitySelector
              classes="theme-3"
              min={1}
              max={10}
              disabled={false}
            />
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-badge">
          <section>
            <h3>Layouts</h3>
            <Badge small>Badge Small</Badge>
            <Badge>Badge Big</Badge>
          </section>
          <main>
            <h3>Theme 1</h3>
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
            <h3>Theme 2</h3>
            <div className="theming-poc-list">
              <Badge classes="base-store" variant="success" small>
                success
              </Badge>
              <Badge classes="base-store" variant="highlighted" small>
                highlighted
              </Badge>
              <Badge classes="base-store" variant="info" small>
                info
              </Badge>
              <Badge classes="base-store" variant="neutral" small>
                neutral
              </Badge>
              <Badge classes="base-store" variant="promo" small>
                promo
              </Badge>
            </div>
            <h3>Theme 3</h3>
            <div className="theming-poc-list">
              <Badge classes="theme-3" variant="success" small>
                success
              </Badge>
              <Badge classes="theme-3" variant="highlighted" small>
                highlighted
              </Badge>
              <Badge classes="theme-3" variant="info" small>
                info
              </Badge>
              <Badge classes="theme-3" variant="neutral" small>
                neutral
              </Badge>
              <Badge classes="theme-3" variant="promo" small>
                promo
              </Badge>
            </div>
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-button">
          <section>
            <h3>Layouts</h3>
            <div className="theming-poc-list" style={{ paddingTop: '10px' }}>
              <Button
                variant="primary"
                icon={<BellRingingIcon size={18} weight="bold" />}
                iconPosition="left"
              >
                Icon Left
              </Button>
              <Button
                variant="primary"
                icon={<BellRingingIcon size={18} weight="bold" />}
                iconPosition="left"
                size="small"
              >
                Icon Left
              </Button>
            </div>
            <div className="theming-poc-list">
              <Button
                variant="primary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
              >
                Icon Right
              </Button>
              <Button
                variant="primary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
                size="small"
              >
                Icon Right
              </Button>
            </div>
            <div className="theming-poc-list">
              <Button variant="primary">Default</Button>
              <Button variant="primary" size="small">
                Default
              </Button>
            </div>
            <div className="theming-poc-list">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" size="small" disabled>
                Disabled
              </Button>
            </div>
          </section>
          <main>
            <h3>Theme 1</h3>
            <div className="theming-poc-list">
              <div className="theming-poc-list theme-1">
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon size={18} weight="bold" />}
                  iconPosition="right"
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
                >
                  Tertiary
                </Button>
              </div>
              <div className="theming-poc-list inverse theme-1">
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
            <h3>Theme 2</h3>
            <div className="theming-poc-list">
              <div className="theming-poc-list base-store">
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon size={18} weight="bold" />}
                  iconPosition="right"
                >
                  Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button
                  variant="tertiary"
                  icon={<BellRingingIcon size={18} weight="bold" />}
                  iconPosition="left"
                >
                  Tertiary
                </Button>
              </div>
              <div className="theming-poc-list inverse base-store">
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
            <h3>Theme 3</h3>
            <div className="theming-poc-list">
              <div className="theming-poc-list theme-3">
                <Button
                  variant="primary"
                  icon={<ArrowRightIcon size={18} weight="bold" />}
                  iconPosition="right"
                >
                  Primary
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button
                  variant="tertiary"
                  icon={<BellRingingIcon size={18} weight="bold" />}
                  iconPosition="left"
                >
                  Tertiary
                </Button>
              </div>
              <div className="theming-poc-list inverse theme-3">
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
          </main>
        </article>
        <hr />
        <article className="theming-poc-content theming-product-card">
          <section>
            <h3>Layouts</h3>
            <div className="theming-poc-list">
              <ProductCard
                product={products[1] ?? {}}
                index={1}
                structure="wide"
              />
              <ProductCard
                product={products[0] ?? {}}
                index={0}
                action="quantitySelector"
                structure="grocery"
                select
                moreInfo
              />
              <ProductCard
                product={products[2] ?? {}}
                index={1}
                structure="horizontal"
                ratio="3:4"
                showDescription
              />
              <ProductCard
                product={products[3] ?? {}}
                index={1}
                action="button"
              />
            </div>
          </section>
          <main>
            <h3>Themes</h3>
            <div className="theming-poc-list">
              <ProductCard
                product={products[1] ?? {}}
                index={1}
                structure="wide"
                badgeVariant="highlighted"
                classes="theme-1"
              />
              <ProductCard
                product={products[0] ?? {}}
                index={0}
                action="quantitySelector"
                structure="grocery"
                badgeVariant="promo"
                select
                moreInfo
                classes="theme-2"
              />
              <ProductCard
                product={products[2] ?? {}}
                index={1}
                structure="horizontal"
                ratio="3:4"
                showDescription
                classes="base-store"
              />
              <ProductCard
                product={products[3] ?? {}}
                index={1}
                action="button"
                classes="base-store"
              />
            </div>
          </main>
        </article>
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
