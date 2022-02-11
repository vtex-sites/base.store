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
        <h2>Toggle</h2>
        <article className="theming-poc-content theming-toggle">
          <section>
            <h3>Layouts</h3>
            <Toggle structure="horizontal" />
            <Toggle structure="vertical" />
          </section>
          <main>
            <h3>Theme: Base Store</h3>
            <div className="base-store">
              <Toggle />
            </div>
            <h3>Theme: NuCommerce</h3>
            <div className="nucommerce">
              <Toggle />
            </div>
            <h3>Theme: Grocery</h3>
            <div className="grocery">
              <Toggle />
            </div>
          </main>
        </article>

        <hr />

        <h2>Select</h2>
        <article className="theming-poc-content theming-select">
          <section>
            <h3>Layout</h3>
            <Select />
          </section>
          <main>
            <h3>Theme: Base Store</h3>
            <div className="base-store">
              <Select />
            </div>
            <h3>Theme: NuCommerce</h3>
            <div className="nucommerce">
              <Select />
            </div>
            <h3>Theme: Grocery</h3>
            <div className="grocery">
              <Select />
            </div>
          </main>
        </article>

        <hr />

        <h2>Quantity Selector (Stepper)</h2>
        <article className="theming-poc-content theming-quantity-selector">
          <section>
            <h3>Layout</h3>
            <QuantitySelector min={1} max={10} disabled={false} />
          </section>
          <main>
            <h3>Theme: Base Store</h3>
            <div className="base-store">
              <QuantitySelector min={1} max={10} disabled={false} />
            </div>
            <h3>Theme: NuCommerce</h3>
            <div className="nucommerce">
              <QuantitySelector min={1} max={10} disabled={false} />
            </div>
            <h3>Theme: Grocery</h3>
            <div className="grocery">
              <QuantitySelector min={1} max={10} disabled={false} />
            </div>
          </main>
        </article>

        <hr />

        <h2>Badge</h2>
        <article className="theming-poc-content / theming-badge">
          <section>
            <h3>Layouts</h3>
            <Badge small>Badge Small</Badge>
            <Badge>Badge Big</Badge>
          </section>
          <main>
            <h3>Theme: Base Store</h3>
            <div className="theming-poc-list / base-store">
              <Badge variant="success" small>
                success
              </Badge>
              <Badge variant="highlighted" small>
                highlighted
              </Badge>
              <Badge variant="info" small>
                info
              </Badge>
              <Badge variant="neutral" small>
                neutral
              </Badge>
              <Badge variant="promo" small>
                promo
              </Badge>
            </div>
            <h3>Theme: NuCommerce</h3>
            <div className="theming-poc-list / nucommerce">
              <Badge variant="success" small>
                success
              </Badge>
              <Badge variant="highlighted" small>
                highlighted
              </Badge>
              <Badge variant="info" small>
                info
              </Badge>
              <Badge variant="neutral" small>
                neutral
              </Badge>
              <Badge variant="promo" small>
                promo
              </Badge>
            </div>
            <h3>Theme: Grocery</h3>
            <div className="theming-poc-list / grocery">
              <Badge variant="success" small>
                success
              </Badge>
              <Badge variant="highlighted" small>
                highlighted
              </Badge>
              <Badge variant="info" small>
                info
              </Badge>
              <Badge variant="neutral" small>
                neutral
              </Badge>
              <Badge variant="promo" small>
                promo
              </Badge>
            </div>
          </main>
        </article>

        <hr />

        <h2>Button</h2>
        <article className="theming-poc-content / theming-button">
          <section>
            <h3>Layouts</h3>
            <div className="theming-poc-stack">
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
            <div className="theming-poc-stack">
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
            <div className="theming-poc-stack">
              <Button variant="primary">Default</Button>
              <Button variant="primary" size="small">
                Default
              </Button>
            </div>
            <div className="theming-poc-stack">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" size="small" disabled>
                Disabled
              </Button>
            </div>
          </section>
          <main>
            <h3>Theme: Base Store</h3>
            <div className="theming-poc-stack">
              <div
                className="theming-poc-list / base-store"
                style={{ paddingLeft: '10px' }}
              >
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
              <div className="theming-poc-list / inverse / base-store">
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
            <h3>Theme: NuCommerce</h3>
            <div className="theming-poc-stack">
              <div
                className="theming-poc-list / nucommerce"
                style={{ paddingLeft: '10px' }}
              >
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
              <div className="theming-poc-list / inverse / nucommerce">
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
            <h3>Theme: Grocery</h3>
            <div className="theming-poc-stack">
              <div
                className="theming-poc-list / grocery"
                style={{ paddingLeft: '10px' }}
              >
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
              <div className="theming-poc-list / inverse / grocery">
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

        <h2>Product Card</h2>
        <article className="theming-poc-content / theming-product-card">
          <article className="theming-poc-content">
            <section>
              <h3>Layout: Default</h3>
              <ProductCard
                product={products[3] ?? {}}
                index={1}
                action="button"
              />
            </section>
            <div className="main / base-store">
              <h3>Theme: Base Store</h3>
              <ProductCard
                product={products[3] ?? {}}
                index={1}
                action="button"
              />
            </div>
          </article>

          <article className="theming-poc-content">
            <section>
              <h3>Layout: Horizontal</h3>
              <ProductCard
                product={products[2] ?? {}}
                index={1}
                structure="horizontal"
                ratio="3:4"
                showDescription
              />
            </section>
            <div className="main / base-store">
              <h3>Theme: Base Store</h3>
              <ProductCard
                product={products[2] ?? {}}
                index={1}
                structure="horizontal"
                ratio="3:4"
                showDescription
              />
            </div>
          </article>

          <article className="theming-poc-content">
            <section>
              <h3>Layout: Wide</h3>
              <ProductCard
                product={products[1] ?? {}}
                index={1}
                structure="wide"
              />
            </section>
            <div className="main / nucommerce">
              <h3>Theme: NuCommerce</h3>
              <ProductCard
                product={products[1] ?? {}}
                index={1}
                structure="wide"
                badgeVariant="highlighted"
              />
            </div>
          </article>

          <article className="theming-poc-content">
            <section>
              <h3>Layout: Grocery</h3>
              <ProductCard
                product={products[0] ?? {}}
                index={0}
                action="quantitySelector"
                structure="grocery"
                select
                moreInfo
              />
            </section>
            <div className="main / grocery">
              <h3>Theme: Grocery</h3>
              <ProductCard
                product={products[0] ?? {}}
                index={0}
                action="quantitySelector"
                structure="grocery"
                badgeVariant="promo"
                select
                moreInfo
              />
            </div>
          </article>
        </article>

        <hr />

        <article className="theming-poc-content / theming-typography">
          <div>
            <h1>New Products Available</h1>
            <p className="lead">
              At FastStore you can shop the best tech of 2022. Enjoy and get 10%
              off on your first purchase.
            </p>
            <p>
              Buy online Get Free Shipping Free return 30 days to return Gift
              cards $20 / $30 / $50 Physical Stores +40 Stores in Brazil Buy
              online Get Free Shipping
            </p>
            <hr />
            <h2>Just Arrived</h2>
            <p>
              Buy online Get Free Shipping Free return 30 days to return Gift
              cards $20 / $30 / $50 Physical Stores +40 Stores in Brazil Buy
              online Get Free Shipping
            </p>
            <hr />
            <p className="superheading">
              Receive our news and promotions in advance.
            </p>
            <p className="superlead">
              Enjoy and get 10% off on your first purchase.
            </p>
          </div>
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
