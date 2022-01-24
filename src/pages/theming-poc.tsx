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
import QuantitySelector from '../components/ui/QuantitySelector'
import Badge from '../components/ui/Badge'

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
            <InputToggle />
          </main>
          <aside className="theming-tokens">
            <h3>Design Tokens</h3>
            <section>
              <div>
                <h4>Default properties</h4>
              </div>
              <div>
                <h4>Interactive states</h4>
              </div>
            </section>
          </aside>
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
          <aside className="theming-tokens">
            <h3>Design Tokens</h3>
            <section>
              <div>
                <h4>Default properties</h4>
                <code>width</code>
                <code>height</code>
                <code>shadow</code>
                <br />
                <code>bkg-color</code>
                <br />
                <code>text-size</code>
                <code>text-color</code>
                <br />
                <code>icon-color</code>
                <br />
                <code>border-radius</code>
                <code>border-width</code>
                <code>border-color</code>
                <br />
                <code>button-bkg-color</code>
                <code>button-border-radius</code>
                <br />
                <code>transition-function</code>
                <code>transition-property</code>
                <code>transition-timing</code>
              </div>
              <div>
                <h4>Interactive state</h4>
                <code>hover-shadow</code>
                <code>hover-bkg-color</code>
                <code>hover-text-color</code>
                <code>hover-icon-color</code>
                <code>hover-border-color</code>
                <code>hover-button-bkg-color</code>
                <br />
                <code>focus-shadow</code>
                <code>focus-bkg-color</code>
                <code>focus-text-color</code>
                <code>focus-icon-color</code>
                <code>focus-border-color</code>
                <code>focus-button-bkg-color</code>
                <br />
                <code>disabled-shadow</code>
                <code>disabled-bkg-color</code>
                <code>disabled-text-color</code>
                <code>disabled-icon-color</code>
                <code>disabled-border-color</code>
                <code>disabled-button-bkg-color</code>
              </div>
            </section>
          </aside>
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
          <aside className="theming-tokens">
            <h3>Design Tokens</h3>
            <section>
              <div>
                <h4>Default properties</h4>
              </div>
              <div>
                <h4>Interactive states</h4>
              </div>
            </section>
          </aside>
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
