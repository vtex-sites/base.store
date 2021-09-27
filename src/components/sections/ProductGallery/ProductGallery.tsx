import { gql } from '@vtex/gatsby-plugin-graphql'
import React, { Fragment } from 'react'
import FacetedFilter from 'src/components/search/FacetedFilter'
import Sort from 'src/components/search/Sort'
import PageBreak from 'src/sdk/search/PageBreak'
import { useSearch } from 'src/sdk/search/useSearch'
import type { GalleryQueryQuery } from '@generated/GalleryQuery.graphql'
import type { ProductGallery_FacetsFragment } from '@generated/ProductGallery_facets.graphql'
import type { ProductGallery_ProductSearchFragment } from '@generated/ProductGallery_productSearch.graphql'

import GalleryPage from './ProductGalleryPage'

interface Props {
  fallbackData?: GalleryQueryQuery
  facets: ProductGallery_FacetsFragment[]
  productSearch: ProductGallery_ProductSearchFragment
}

function ProductGallery({
  fallbackData,
  productSearch: { totalCount },
  facets,
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>Total Products: {totalCount}</div>
        <Sort />
      </div>

      {/* Add link to previous page. This helps on SEO */}
      {prev !== false && (
        <a
          onClick={setPrevPage}
          href={prev.link}
          rel="prev"
          style={{ padding: '30px', display: 'block', textAlign: 'center' }}
        >
          Previous Page
        </a>
      )}

      {/* Render ALL products */}
      {pages.map((page) => (
        <Fragment key={`gallery-page-${page}`}>
          <PageBreak page={page} />
          <GalleryPage
            fallbackData={page === searchParams.page ? fallbackData : undefined}
            page={page}
          />
        </Fragment>
      ))}

      {/* Add link to next page. This helps on SEO */}
      {next !== false && (
        <a
          data-testid="show-more"
          onClick={setNextPage}
          href={next.link}
          rel="next"
          style={{ padding: '30px', display: 'block', textAlign: 'center' }}
        >
          Show More
        </a>
      )}

      {/* Prefetch Previous and Next pages */}
      {prev !== false && <GalleryPage page={prev.cursor} display={false} />}
      {next !== false && <GalleryPage page={next.cursor} display={false} />}
    </>
  )
}

export const fragment = gql`
  fragment ProductGallery_productSearch on VTEX_ProductSearch {
    totalCount: recordsFiltered
  }
  fragment ProductGallery_facets on VTEX_Facet {
    ...FacetedFilter_facets
  }
`

export default ProductGallery
