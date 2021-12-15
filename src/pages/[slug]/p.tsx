import { useSession } from '@faststore/sdk'
import { gql } from '@vtex/graphql-utils'
import { BreadcrumbJsonLd, NextSeo, ProductJsonLd } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import ProductDetails from 'src/components/sections/ProductDetails'
import { useSiteUrl } from 'src/sdk/useSiteUrl'
import { execute } from 'src/server'
import type {
  ProductPageQueryQuery,
  ProductPageQueryQueryVariables,
} from '@generated/graphql'
import type { GetStaticPaths, GetStaticProps } from 'next'

function Page(props: ProductPageQueryQuery) {
  const { product } = props
  const { currency } = useSession()
  const siteUrl = useSiteUrl()
  const router = useRouter()

  if (router.isFallback) {
    return <div>...loading</div>
  }

  if (!product) {
    throw new Error('NotFound')
  }

  const { slug } = router.query
  const { title, description } = product.seo
  const canonical = `${siteUrl}/${slug}/p`

  return (
    <>
      {/* SEO */}
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: 'og:product',
          url: canonical,
          title,
          description,
          images: product.image.map((img) => ({
            url: img.url,
            alt: img.alternateName,
          })),
        }}
        additionalMetaTags={[
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
        productName={product.name}
        description={product.description}
        brand={product.brand.name}
        sku={product.sku}
        gtin13={product.gtin}
        images={product.image.map((img) => img.url)} // Somehow, Google does not understand this valid Schema.org schema, so we need to do conversions
        aggregateOffer={{
          lowPrice: product.offers.lowPrice.toString(),
          highPrice: product.offers.highPrice.toString(),
          priceCurrency: product.offers.priceCurrency,
        }}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <h1 className="absolute top-[-100px]">{title}</h1>

      <ProductDetails product={product} />
    </>
  )
}

export const querySSG = gql`
  query ProductPageQuery($slug: String!) {
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

export const getStaticProps: GetStaticProps<ProductPageQueryQuery> = async (
  context
) => {
  const slug = context.params?.slug

  if (typeof slug !== 'string') {
    throw new Error(`Slug needs to be string, received ${typeof slug}`)
  }

  const response = await execute<
    ProductPageQueryQuery,
    ProductPageQueryQueryVariables
  >({
    operationName: querySSG,
    variables: {
      slug,
    },
  })

  if (response.errors != null || response.data == null) {
    return {
      notFound: true,
    }
  }

  return {
    props: response.data,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default Page
