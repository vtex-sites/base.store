import { gql } from '@vtex/graphql-utils'
import React, { Fragment } from 'react'
import FacetedFilter from 'src/components/search/FacetedFilter'
import Sort from 'src/components/search/Sort'
import { useSearch } from 'src/sdk/search/useSearch'
import type {
  ProductGallery_FacetsFragment,
  ProductGallery_ProductsFragment,
  SearchQueryQuery,
} from '@generated/graphql'

import GalleryPage from './ProductGalleryPage'

interface Props {
  fallbackData?: SearchQueryQuery
  facets: ProductGallery_FacetsFragment[]
  products: ProductGallery_ProductsFragment
  title: string
}

function ProductGallery({
  fallbackData,
  facets,
  title,
  products: {
    pageInfo: { totalCount },
  },
}: Props) {
  const {
    searchParams,
    pageInfo: {
      nextPage: next,
      prevPage: prev,
      pages,
      addNextPage: setNextPage,
      addPreviousPage: setPrevPage,
    },
  } = useSearch()

  return (
    <>
      {/* Controls */}
      <FacetedFilter facets={facets} />
      <div className="flex items-center justify-between">
        <div>Total Products: {totalCount}</div>
        <Sort />
      </div>

      {/* Add link to previous page. This helps on SEO */}
      {prev !== false && (
        <a
          className="p-8 block center"
          onClick={setPrevPage}
          href={prev.link}
          rel="prev"
        >
          Previous Page
        </a>
      )}

      {/* Render ALL products */}
      {pages.map((page) => (
        <Fragment key={`gallery-page-${page}`}>
          <GalleryPage
            fallbackData={page === searchParams.page ? fallbackData : undefined}
            page={page}
            title={title}
          />
        </Fragment>
      ))}

      {/* Add link to next page. This helps on SEO */}
      {next !== false && (
        <a
          className="p-8 block center"
          data-testid="show-more"
          onClick={setNextPage}
          href={next.link}
          rel="next"
        >
          Show More
        </a>
      )}

      {/* Prefetch Previous and Next pages */}
      {prev !== false && (
        <GalleryPage page={prev.cursor} display={false} title={title} />
      )}
      {next !== false && (
        <GalleryPage page={next.cursor} display={false} title={title} />
      )}
    </>
  )
}

export const fragment = gql`
  fragment ProductGallery_products on BrowserStoreProductConnection {
    pageInfo {
      totalCount
    }
  }
  fragment ProductGallery_facets on StoreFacet {
    ...FacetedFilter_facets
  }
`

export default ProductGallery
