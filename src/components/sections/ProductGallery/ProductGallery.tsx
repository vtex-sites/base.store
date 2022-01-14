import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useState, useEffect } from 'react'
import Button, { LinkButton } from 'src/components/ui/Button'
import { FadersHorizontal as FadersHorizontalIcon } from 'phosphor-react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Filter from 'src/components/search/Filter'
import SROnly from 'src/components/ui/SROnly'
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
    return <div className="temp-data-loading">loading...</div>
  }

  return (
    <>
      <div className="plp-filters-bar temp">
        <Sort />

        {isMobile && (
          <Button
            data-testid="open-filter-button"
            variant="tertiary"
            icon={<FadersHorizontalIcon size={16} />}
            iconPosition="left"
            aria-label="Open Filters"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filters
          </Button>
        )}
      </div>

      <div className="plp-results-wrapper">
        {/* Controls */}
        <div
          className="plp-results-count"
          data-testid="total-product-count"
          data-count={totalCount}
        >
          <h2>
            <SROnly text="Search results" />
          </h2>
          {totalCount} Results
        </div>

        <div className="plp-results-results">
          {/* Filters */}
          <div>
            <Filter
              isOpen={isFilterOpen}
              facets={data.search.facets}
              onDismiss={() => setIsFilterOpen(false)}
            />
          </div>

          {/* Add link to previous page. This helps on SEO */}
          {prev !== false && (
            <>
              <GatsbySeo linkTags={[{ rel: 'prev', href: prev.link }]} />
              <a
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
            <div className="plp-results-load-more">
              <GatsbySeo linkTags={[{ rel: 'next', href: next.link }]} />
              <LinkButton
                data-testid="show-more"
                onClick={(e) => {
                  e.currentTarget.blur()
                  e.preventDefault()
                  addNextPage()
                }}
                href={next.link}
                rel="next"
                variant="secondary"
              >
                Load more products
              </LinkButton>
            </div>
          )}

          {/* Prefetch Previous and Next pages */}
          {prev !== false && (
            <GalleryPage page={prev.cursor} display={false} title={title} />
          )}
          {next !== false && (
            <GalleryPage page={next.cursor} display={false} title={title} />
          )}
        </div>
      </div>
    </>
  )
}

export default ProductGallery
