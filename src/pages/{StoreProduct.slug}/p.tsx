import { useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { graphql } from 'gatsby'
import {
  BreadcrumbJsonLd,
  GatsbySeo,
  ProductJsonLd,
} from 'gatsby-plugin-next-seo'
import React, { useMemo } from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { PageProps } from 'gatsby'
import type {
  BrowserProductQueryQuery,
  BrowserProductQueryQueryVariables,
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'

export type Props = PageProps<
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables
>

export const queryCSR = gql`
  query BrowserProductQuery($locator: [IStoreSelectedFacet!]!) {
    product(locator: $locator) {
      ...ProductDetailsFragment_product
    }
  }
`

const useProduct = <T extends BrowserProductQueryQuery>(
  productID: string,
  fallbackData?: T
) => {
  const { channel } = useSession()
  const variables = useMemo(() => {
    if (!channel) {
      throw new Error(`useProduct: 'channel' from session is 'null'.`)
    }

    return {
      locator: [
        { key: 'id', value: productID },
        { key: 'channel', value: channel },
      ],
    }
  }, [channel, productID])

  return useQuery<
    BrowserProductQueryQuery & T,
    BrowserProductQueryQueryVariables
  >(queryCSR, variables, {
    fallbackData,
    revalidateOnMount: true,
  })
}

function Page(props: Props) {
  const {
    data: { product: staleProduct, site },
    location: { host },
    params: { slug },
  } = props

  if (!staleProduct) {
    throw new Error('NotFound')
  }

  const { locale, currency } = useSession()
  const { data, isValidating } = useProduct(staleProduct.id, {
    product: staleProduct,
  })

  if (data?.product == null) {
    return <div>loading...</div>
  }

  const canonical = host !== undefined ? `https://${host}/${slug}` : `/${slug}`
  const title = staleProduct.seo.title ?? site?.siteMetadata?.title ?? ''
  const description =
    staleProduct.seo.description ?? site?.siteMetadata?.description ?? ''

  const { product: freshProduct } = data

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
          images: staleProduct.image.map((img) => ({
            url: img.url,
            alt: img.alternateName,
          })),
        }}
        metaTags={[
          {
            property: 'product:price:amount',
            content: staleProduct.offers.lowPrice?.toString() ?? undefined,
          },
          {
            property: 'product:price:currency',
            content: currency.code,
          },
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={staleProduct.breadcrumbList.itemListElement ?? []}
      />
      <ProductJsonLd
        name={staleProduct.name}
        description={staleProduct.description}
        brand={staleProduct.brand.name}
        sku={staleProduct.sku}
        gtin={staleProduct.gtin}
        images={staleProduct.image.map((img) => img.url)} // Somehow, Google does not understand this valid Schema.org schema, so we need to do conversions
        offersType="AggregateOffer"
        offers={{
          ...staleProduct.offers,
          price: staleProduct.offers.offers[0].price.toString(),
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1 className="absolute top-[-100px]">{title}</h1>

      <ProductDetails product={freshProduct} isValidating={isValidating} />
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
