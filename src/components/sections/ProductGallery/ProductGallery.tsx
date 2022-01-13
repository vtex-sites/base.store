import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useState, useEffect } from 'react'
import Sort from 'src/components/search/Sort'
import { Icon as UIIcon } from '@faststore/ui'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Filter from 'src/components/search/Filter'
import Button from 'src/components/ui/Button'

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
  const { width: screenWidth } = useWindowDimensions()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!screenWidth) {
      return
    }

    // notebook breakpoint = 1280px (See breakpoints on styles/global.scss)
    setIsMobile(screenWidth < 1280)
  }, [screenWidth])

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div data-testid="total-product-count" data-count={totalCount}>
          Total Products: {totalCount}
        </div>
        <Sort />
      </div>

      {/* Filters */}
      <div>
        <Filter
          isOpen={isFilterOpen}
          facets={data.search.facets}
          onDismiss={() => setIsFilterOpen(false)}
        />
        {isMobile && (
          <Button
            data-testid="open-filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <UIIcon component={<div />} />
            Filters
          </Button>
        )}
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
