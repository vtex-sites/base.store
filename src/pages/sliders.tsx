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
  const baseImageProps = {
    layout: 'fullWidth' as const,
    backgroundColor: '#f0f0f0',
    loading: 'eager' as const,
    options: {
      fitIn: true,
    },
  }

  return (
    <>
      <section className="page__section / grid-section grid-content">
        <h1>React Slick</h1>

        <p>Total: 15 | Show: 4</p>
        <Slider>
          {products.slice(0, 15).map((product) => (
            <Image
              baseUrl={product.image[0].url}
              alt={product.name}
              key={`${product.id}`}
              {...baseImageProps}
            />
          ))}
        </Slider>
        <br />
        <br />

        <p>Total: 6 | Show: 3</p>
        <Slider show={3}>
          {products.slice(0, 6).map((product) => (
            <Image
              baseUrl={product.image[0].url}
              alt={product.name}
              key={`${product.id}`}
              {...baseImageProps}
            />
          ))}
        </Slider>
        <br />
        <br />

        <p>Total: 5 | Show: 5</p>
        <Slider show={5}>
          {products.slice(0, 5).map((product) => (
            <Image
              baseUrl={product.image[0].url}
              alt={product.name}
              key={`${product.id}`}
              {...baseImageProps}
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
