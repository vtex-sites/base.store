import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

import '../../styles/pages/pdp.scss'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
>

function Page(props: Props) {
  const { locale, currency } = useSession()
  const {
    data: { product, site },
    location: { host },
    params: { slug },
  } = props

  if (!product) {
    throw new Error('NotFound')
  }

  const title = product.seo.title ?? site?.siteMetadata?.title ?? ''
  const description =
    product.seo.description ?? site?.siteMetadata?.description ?? ''

  const canonical =
    host !== undefined ? `https://${host}/${slug}/p` : `/${slug}/p`

  return (
    <>
      {/* SEO */}
      <GatsbySeo
        title={title}
        description={description}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'og:product',
          url: `${site?.siteMetadata?.siteUrl}${slug}`,
          title,
          description,
          images: product.image.map((img) => ({
            url: img.url,
            alt: img.alternateName,
          })),
        }}
        metaTags={[
          {
            property: 'product:price:amount',
            content: product.offers.lowPrice?.toString() ?? undefined,
          },
          {
            property: 'product:price:currency',
            content: currency.code,
          },
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={product.breadcrumbList.itemListElement ?? []}
      />
      <ProductJsonLd
        name={product.name}
        description={product.description}
        brand={product.brand.name}
        sku={product.sku}
        gtin={product.gtin}
        images={product.image.map((img) => img.url)} // Somehow, Google does not understand this valid Schema.org schema, so we need to do conversions
        offersType="AggregateOffer"
        offers={{
          ...product.offers,
          price: product.offers.offers[0].price.toString(),
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1 className="temp-offscreen">{title}</h1>

      <ProductDetails product={product} />

      {/* TODO: Styles will be available after PR #191. */}
      <section className="page__section page__section-shelf / grid-section">
        <h2 className="title-section / grid-content">You might also like</h2>
        <div className="page__section-content">
          {/* TODO: Component will be available after PR #191. */}
          {/* <ProductShelf /> */}
        </div>
      </section>
    </>
  )
}

export const querySSG = graphql`
  query ProductPageQuery($id: String!) {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
      }
    }

    product: storeProduct(id: { eq: $id }) {
      id: productID
      slug

      seo {
        title
        description
      }

      brand {
        name
      }

      slug
      sku
      gtin
      name
      description

      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }

      image {
        url
        alternateName
      }

      offers {
        lowPrice
        highPrice
        priceCurrency
        offers {
          price
          priceValidUntil
          priceCurrency
          availability
          itemCondition
          seller {
            identifier
          }
        }
      }

      ...ProductDetailsFragment_product
    }
  }
`

export default Page
