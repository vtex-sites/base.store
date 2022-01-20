import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import Button, { LinkButton } from 'src/components/ui/Button'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Filter from 'src/components/search/Filter'
import Sort from 'src/components/search/Sort'
import { FadersHorizontal as FadersHorizontalIcon } from 'phosphor-react'
import type { FacetedFilter_FacetsFragment } from '@generated/graphql'

import GalleryPage from './ProductGalleryPage'
import { useGalleryQuery } from './useGalleryQuery'

interface Props {
  title: string
}

function ProductGallery({ title }: Props) {
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()
  const facets = useRef<FacetedFilter_FacetsFragment[]>([])

  const totalCount = data?.search.products.pageInfo.totalCount ?? 0
  const { next, prev } = usePagination(totalCount)
  const { width: screenWidth } = useWindowDimensions()

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!screenWidth) {
      return
    }

    const notebookBreakpoint =
      getComputedStyle(document.documentElement).getPropertyValue(
        '--breakpoint-notebook'
      ) || '1280'

    setIsMobile(screenWidth < parseInt(notebookBreakpoint, 10))
  }, [screenWidth])

  const orderedFacets: FacetedFilter_FacetsFragment[] = useMemo(() => {
    if (data) {
      const orderFacets = data.search.facets.map((facet) => {
        if (facet.type === 'BOOLEAN') {
          facet.values = facet.values.sort((a, b) =>
            a.label.localeCompare(b.label)
          )
        }

        return facet
      })

      facets.current = orderFacets
    }

    return facets.current
  }, [data])

  if (!facets.current.length) {
    return <div className="plp-temp-data-loading">loading...</div>
  }

  return (
    <div className="grid-content-full">
      <div className="plp-content-grid / grid-content">
        <div className="plp-filters-wrapper">
          <Filter
            isOpen={isFilterOpen}
            facets={orderedFacets}
            onDismiss={() => setIsFilterOpen(false)}
          />
        </div>

        {data ? (
          <>
            <div
              className="plp-results-count-wrapper"
              data-testid="total-product-count"
              data-count={totalCount}
            >
              <h2>{totalCount} Results</h2>
            </div>

            <div className="plp-sort-wrapper">
              <Sort />

              {isMobile && (
                <Button
                  variant="tertiary"
                  data-testid="open-filter-button"
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

              {/* Prefetch Previous and Next pages */}
              {prev !== false && (
                <GalleryPage page={prev.cursor} display={false} title={title} />
              )}
              {next !== false && (
                <GalleryPage page={next.cursor} display={false} title={title} />
              )}

              {/* Add link to next page. This helps on SEO */}
              {next !== false && (
                <div className="plp-load-more-wrapper">
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
            </div>
          </>
        ) : (
          <div className="plp-temp-data-loading">loading...</div>
        )}
      </div>
    </div>
  )
}

export default ProductGallery
