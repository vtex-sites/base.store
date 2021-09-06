import React from 'react'
import { gql } from '@vtex/gatsby-plugin-graphql'
import { useSearch } from 'src/sdk/search/useSearch'
import type { GalleryQueryQuery } from '@generated/GalleryQuery.graphql'
import type { ProductGallery_FacetsFragment } from '@generated/ProductGallery_facets.graphql'
import type { ProductGallery_ProductsFragment } from '@generated/ProductGallery_products.graphql'

import GalleryPage from './ProductGalleryPage'

interface Props {
  initialData?: GalleryQueryQuery
  facets: ProductGallery_FacetsFragment[]
  products: ProductGallery_ProductsFragment
}

function ProductGallery({
  initialData,
  facets,
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
      <div>Total Products: {totalCount}</div>
      <div>Number of Facets Found: {facets.length}</div>

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
        <GalleryPage
          key={`gallery-page-${page}`}
          initialData={page === searchParams.page ? initialData : undefined}
          page={page}
        />
      ))}

      {/* Add link to next page. This helps on SEO */}
      {next !== false && (
        <a
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
  fragment ProductGallery_products on BrowserStoreProductConnection {
    pageInfo {
      totalCount
    }
  }
  fragment ProductGallery_facets on StoreFacet {
    key
    label
    type
    values {
      label
      value
      selected
      quantity
    }
  }
`

export default ProductGallery
