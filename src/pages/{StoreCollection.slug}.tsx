import { SearchProvider, useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import Breadcrumb from 'src/components/sections/Breadcrumb'
import Hero from 'src/components/sections/Hero'
import ProductGallery from 'src/components/sections/ProductGallery'
import ProductShelf from 'src/components/sections/ProductShelf'
import ScrollToTopButton from 'src/components/sections/ScrollToTopButton'
import { ITEMS_PER_PAGE } from 'src/constants'
import { useSearchParams } from 'src/hooks/useSearchParams'
import { applySearchState } from 'src/sdk/search/state'
import { mark } from 'src/sdk/tests/mark'
import type { Props } from 'src/hooks/useSearchParams'
import IconSVG from 'src/components/common/IconSVG'

function Page(props: Props) {
  const {
    data: {
      site,
      collection,
      allStoreProduct: { nodes: youMightAlsoLikeProducts },
    },
    location: { host },
    params: { slug },
  } = props

  const { locale } = useSession()
  const searchParams = useSearchParams(props)

  const { page } = searchParams
  const title = collection?.seo.title ?? site?.siteMetadata?.title ?? ''
  const pageQuery = page !== 0 ? `?page=${page}` : ''
  const canonical =
    host !== undefined
      ? `https://${host}/${slug}/${pageQuery}`
      : `/${slug}/${pageQuery}`

  return (
    <SearchProvider
      onChange={applySearchState}
      itemsPerPage={ITEMS_PER_PAGE}
      {...searchParams}
    >
      {/* SEO */}
      <GatsbySeo
        title={title}
        titleTemplate={site?.siteMetadata?.titleTemplate ?? ''}
        description={site?.siteMetadata?.description ?? ''}
        canonical={canonical}
        language={locale}
        openGraph={{
          type: 'website',
          title,
          description: site?.siteMetadata?.description ?? '',
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={collection?.breadcrumbList.itemListElement ?? []}
      />

      {/*
        Sections: Components imported from '../components/sections' only.
        Do not import or render components from any other folder in here.
      */}
      <Breadcrumb
        breadcrumbList={collection?.breadcrumbList.itemListElement}
        name={title}
      />

      <Hero
        variant="small"
        title={title}
        subtitle={`All the amazing ${title} from the brands we partner with.`}
        imageSrc="https://storeframework.vtexassets.com/arquivos/ids/190897/Photo.jpg"
        imageAlt="Quest 2 Controller on a table"
        icon={
          <IconSVG name="Headphones" width={48} height={48} weight="thin" />
        }
      />

      <ProductGallery title={title} />

      {youMightAlsoLikeProducts?.length > 0 && (
        <ProductShelf
          products={youMightAlsoLikeProducts.slice(0, 5)}
          title="You might also like"
          withDivisor
        />
      )}

      <ScrollToTopButton />
    </SearchProvider>
  )
}

/**
 * This query is run during SSG
 * */
export const query = graphql`
  query CollectionPageQuery($id: String!) {
    site {
      siteMetadata {
        titleTemplate
        title
        description
      }
    }

    collection: storeCollection(id: { eq: $id }) {
      seo {
        title
        description
      }
      breadcrumbList {
        itemListElement {
          item
          name
          position
        }
      }
      meta {
        selectedFacets {
          key
          value
        }
      }
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
