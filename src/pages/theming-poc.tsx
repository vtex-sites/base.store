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
import BuyButton from '../components/ui/BuyButton'
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
        <div className="theming-poc-content theming-toggle">
          <section>
            <h3>Layouts</h3>
            <InputToggle structure="horizontal" />
            <InputToggle structure="vertical" />
          </section>
          <main>
            <h3>Themes</h3>
            <InputToggle />
            <InputToggle />
            <InputToggle />
            <InputToggle />
          </main>
        </div>
        <hr />
        <div className="theming-poc-content theming-quantity-selector">
          <section>
            <h3>Layout</h3>
            <QuantitySelector min={1} max={10} disabled={false} />
          </section>
          <main>
            <h3>Themes</h3>
            <QuantitySelector min={1} max={10} disabled={false} />
            <QuantitySelector min={1} max={10} disabled={false} />
            <QuantitySelector min={1} max={10} disabled={false} />
          </main>
        </div>
        <hr />
        <div className="theming-poc-content theming-badge">
          <section>
            <h3>Layouts</h3>
            <Badge small>Badge Small</Badge>
            <Badge>Badge Big</Badge>
          </section>
          <main>
            <h3>Themes</h3>
            <div className="theming-poc-list">
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
            </div>
            <div className="theming-poc-list">
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
            </div>
            <div className="theming-poc-list">
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
            </div>
          </main>
        </div>
        <hr />
        <div className="theming-poc-content theming-badge">
          <section>
            <h3>Layouts</h3>
            <Button
              variant="primary"
              icon={<BellRingingIcon size={18} weight="bold" />}
              iconPosition="left"
            >
              Icon Left
            </Button>
            <Button
              variant="primary"
              icon={<ArrowRightIcon size={18} weight="bold" />}
              iconPosition="right"
            >
              Icon Right
            </Button>
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </section>
          <main>
            <h3>Themes</h3>
            <div className="theming-poc-list">
              <BuyButton>Buy Now</BuyButton>
              <Button
                variant="primary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
              >
                Primary
              </Button>
              <Button
                variant="secondary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
              >
                Secondary
              </Button>
              <Button
                variant="tertiary"
                icon={<ArrowRightIcon size={18} weight="bold" />}
                iconPosition="right"
              >
                Tertiary
              </Button>
            </div>
          </main>
        </div>
        <hr />
        <div className="theming-poc-content theming-product-card">
          <section>
            <h3>Layouts</h3>
            <ProductCard
              product={products[0] ?? {}}
              index={0}
              action="quantitySelector"
              structure="grocery"
              select
              moreInfo
            />
            <ProductCard
              product={products[1] ?? {}}
              index={1}
              structure="wide"
            />
            <ProductCard
              product={products[2] ?? {}}
              index={1}
              structure="horizontal"
              ratio="3:4"
              showDescription
            />
            <ProductCard product={products[3] ?? {}} index={1} />
          </section>
          <main>
            <h3>Themes</h3>
            <ProductCard
              product={products[0] ?? {}}
              index={0}
              action="quantitySelector"
              structure="grocery"
              select
              moreInfo
            />
            <ProductCard
              product={products[1] ?? {}}
              index={1}
              structure="wide"
            />
            <ProductCard
              product={products[2] ?? {}}
              index={1}
              structure="horizontal"
              ratio="3:4"
              showDescription
            />
            <ProductCard product={products[3] ?? {}} index={1} />
          </main>
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
