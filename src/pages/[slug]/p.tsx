import { useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import React, { useEffect, useMemo } from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import ProductShelf from 'src/components/sections/ProductShelf'
import { mark } from 'src/sdk/tests/mark'
import { execute } from 'src/server'
import type { PageProps } from 'gatsby'
import type {
  ProductPageQueryQuery,
  ServerProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
  unknown,
  ServerProductPageQueryQuery
>

function Page(props: Props) {
  const { locale, currency } = useSession()
  const {
    data: { site },
    serverData: { product, allProducts },
    location: { host },
    params: { slug },
  } = props

  const youMightAlsoLikeProducts = useMemo(
    () => allProducts?.edges.map((edge) => edge.node),
    [allProducts]
  )

  const notFound = !product
  const title = product?.seo.title ?? site?.siteMetadata?.title ?? ''
  const description =
    product?.seo.description ?? site?.siteMetadata?.description ?? ''

  const canonical =
    host !== undefined ? `https://${host}/${slug}/p` : `/${slug}/p`

  useEffect(() => {
    if (notFound) {
      window.location.href = `/404/?from=${encodeURIComponent(
        window.location.pathname
      )}`
    }
  }, [notFound])

  if (notFound) {
    return null
  }

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

      <ProductDetails product={product} />

      {youMightAlsoLikeProducts?.length > 0 && (
        <section className="page__section page__section-shelf page__section-divisor / grid-section">
          <h2 className="title-section / grid-content">You might also like</h2>
          <div className="page__section-content">
            <ProductShelf products={youMightAlsoLikeProducts.slice(0, 5)} />
          </div>
        </section>
      )}
    </>
  )
}

export const querySSG = graphql`
  query ProductPageQuery {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
      }
    }
  }
`

export const querySSR = gql`
  query ServerProductPageQuery($slug: String!) {
    product(locator: [{ key: "slug", value: $slug }]) {
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

    allProducts(first: 6, after: "0") {
      edges {
        node {
          ...ProductSummary_product
        }
      }
    }
  }
`

export const getServerData = async ({
  params: { slug },
}: {
  params: Record<string, string>
}) => {
  try {
    const { data } = await execute({
      operationName: querySSR,
      variables: { slug },
    })

    return {
      status: 200,
      props: data ?? {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  } catch (err) {
    console.error(err)

    return {
      status: 500,
      props: {},
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    }
  }
}

Page.displayName = 'Page'

export default mark(Page)
