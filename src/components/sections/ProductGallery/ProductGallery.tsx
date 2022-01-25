import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useState, useEffect, lazy, Suspense } from 'react'
import Button, { LinkButton } from 'src/components/ui/Button'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { FadersHorizontal as FadersHorizontalIcon } from 'phosphor-react'

import { useGalleryQuery } from './useGalleryQuery'
import { useOrderedFacets } from './useOrderedFacets'

const GalleryPage = lazy(() => import('./ProductGalleryPage'))
const Sort = lazy(() => import('src/components/search/Sort'))
const Filter = lazy(() => import('src/components/search/Filter'))

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

    const notebookBreakpoint =
      getComputedStyle(document.documentElement).getPropertyValue(
        '--breakpoint-notebook'
      ) || '1280'

    setIsMobile(screenWidth < parseInt(notebookBreakpoint, 10))
  }, [screenWidth])

  const orderedFacets = useOrderedFacets(data)

  if (!orderedFacets.length) {
    return <div className="product-listing__data-loading">loading...</div>
  }

  return (
    <div className="product-listing / grid-content-full">
      <div className="product-listing__content-grid / grid-content">
        <div className="product-listing__filters">
          <Suspense fallback={null}>
            <Filter
              isOpen={isFilterOpen}
              facets={orderedFacets}
              onDismiss={() => setIsFilterOpen(false)}
            />
          </Suspense>
        </div>

        {data ? (
          <>
            <div
              className="product-listing__results-count"
              data-testid="total-product-count"
              data-count={totalCount}
            >
              <h2>{totalCount} Results</h2>
            </div>

            <div className="product-listing__sort">
              <Suspense fallback={null}>
                <Sort />
              </Suspense>

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

            <div className="product-listing__results">
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
                <Suspense fallback={null} key={`gallery-page-${page}`}>
                  <GalleryPage
                    key={`gallery-page-${page}`}
                    fallbackData={page === searchState.page ? data : undefined}
                    page={page}
                    title={title}
                  />
                </Suspense>
              ))}

              {/* Prefetch Previous and Next pages */}
              {prev !== false && (
                <Suspense fallback={null}>
                  <GalleryPage
                    page={prev.cursor}
                    display={false}
                    title={title}
                  />
                </Suspense>
              )}
              {next !== false && (
                <Suspense fallback={null}>
                  <GalleryPage
                    page={next.cursor}
                    display={false}
                    title={title}
                  />
                </Suspense>
              )}

              {/* Add link to next page. This helps on SEO */}
              {next !== false && (
                <div className="product-listing__pagination">
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
          <div className="product-listing__data-loading">loading...</div>
        )}
      </div>
    </div>
  )
}

export default ProductGallery
