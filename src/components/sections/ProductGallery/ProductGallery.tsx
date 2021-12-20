import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import FacetedFilter from 'src/components/search/FacetedFilter'
import Sort from 'src/components/search/Sort'

import GalleryPage from './ProductGalleryPage'
import { useGalleryQuery } from './useGalleryQuery'

interface Props {
  title: string
}

function ProductGallery({ title }: Props) {
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()

  const totalCount = data?.search.products.pageInfo.totalCount ?? 0
  const { next, prev } = usePagination(totalCount)

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <>
      {/* Controls */}
      <FacetedFilter facets={data.search.facets} />
      <div className="flex items-center justify-between">
        <div data-testid="total-product-count" data-count={totalCount}>
          Total Products: {totalCount}
        </div>
        <Sort />
      </div>

      {/* Add link to previous page. This helps on SEO */}
      {prev !== false && (
        <>
          <GatsbySeo linkTags={[{ rel: 'prev', href: prev.link }]} />
          <a
            className="p-8 block center"
            onClick={(e) => {
              e.currentTarget.blur()
              e.preventDefault()
              addPrevPage()
            }}
            href={prev.link}
            rel="prev"
          >
            Previous Page
          </a>
        </>
      )}

      {/* Render ALL products */}
      {pages.map((page) => (
        <GalleryPage
          key={`gallery-page-${page}`}
          fallbackData={page === searchState.page ? data : undefined}
          page={page}
          title={title}
        />
      ))}

      {/* Add link to next page. This helps on SEO */}
      {next !== false && (
        <>
          <GatsbySeo linkTags={[{ rel: 'next', href: next.link }]} />
          <a
            className="p-8 block center"
            data-testid="show-more"
            onClick={(e) => {
              e.currentTarget.blur()
              e.preventDefault()
              addNextPage()
            }}
            href={next.link}
            rel="next"
          >
            Show More
          </a>
        </>
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

export default ProductGallery
