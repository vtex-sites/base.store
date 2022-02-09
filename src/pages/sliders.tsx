import React, { useMemo } from 'react'
import Slider from 'src/components/ui/Slider'
import { graphql } from 'gatsby'
import type { PageProps } from 'gatsby'
import type { SlidersPageQueryQuery } from '@generated/graphql'
import { Image } from 'src/components/ui/Image'

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
        <Slider>
          {products.slice(0, 10).map((product) => (
            <Image
              baseUrl={product.image[0].url}
              alt={product.name}
              key={`${product.id}`}
              layout="fullWidth"
              backgroundColor="#f0f0f0"
              loading="eager"
              options={{
                fitIn: true,
              }}
            />
          ))}
        </Slider>
        <br />
        <br />

        <p>Total: 6 | Show: 3</p>
        <Slider>
          {products.slice(0, 7).map((product) => (
            <Image
              baseUrl={product.image[0].url}
              alt={product.name}
              key={`${product.id}`}
              layout="fullWidth"
              backgroundColor="#f0f0f0"
              loading="eager"
              options={{
                fitIn: true,
              }}
            />
          ))}
        </Slider>
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
