import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import ProductShelf from 'src/components/sections/ProductShelf'
import { mark } from 'src/sdk/tests/mark'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
>

function Page(props: Props) {
  const { locale, currency } = useSession()
  const {
    data: {
      product,
      site,
      allStoreProduct: { nodes: youMightAlsoLikeProducts },
    },
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
        WARNING: Do not import or render components from any
        other folder than '../components/sections' in here.

        This is necessary to keep the integration with the CMS
        easy and consistent, enabling the change and reorder
        of elements on this page.

        If needed, wrap your component in a <Section /> component
        (not the HTML tag) before rendering it here.
      */}

      <ProductDetails product={product} />

      {youMightAlsoLikeProducts?.length > 0 && (
        <ProductShelf
          products={youMightAlsoLikeProducts.slice(0, 5)}
          title="You might also like"
          withDivisor
        />
      )}
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
          availability
          price
          priceValidUntil
          priceCurrency
          itemCondition
          seller {
            identifier
          }
        }
      }

      ...ProductDetailsFragment_product
    }

    allStoreProduct(limit: 5) {
      nodes {
        ...ProductSummary_product
      }
    }
  }
`

Page.displayName = 'Page'

export default mark(Page)
