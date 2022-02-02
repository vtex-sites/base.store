import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { useState, lazy, Suspense } from 'react'
import Button, { LinkButton } from 'src/components/ui/Button'
import Sort from 'src/components/search/Sort'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import {
  FadersHorizontal as FadersHorizontalIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'phosphor-react'

import { useGalleryQuery } from './useGalleryQuery'
import { useOrderedFacets } from './useOrderedFacets'
import { useTotalCount } from './useTotalCount'

const GalleryPage = lazy(() => import('./ProductGalleryPage'))
const Filter = lazy(() => import('src/components/search/Filter'))

interface Props {
  title: string
  slug?: string
}

function ProductGallery({ title, slug }: Props) {
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()

  const totalCount = useTotalCount(data)

  const { next, prev } = usePagination(totalCount)
  const { isMobile } = useWindowDimensions()

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const orderedFacets = useOrderedFacets(data)

  return (
    <>
      <div className="product-listing__filters">
        <Suspense fallback={null}>
          <Filter
            slug={slug}
            isOpen={isFilterOpen}
            facets={orderedFacets}
            onDismiss={() => setIsFilterOpen(false)}
          />
        </Suspense>
      </div>

      <div
        className="product-listing__results-count"
        data-testid="total-product-count"
        data-count={totalCount}
      >
        {<h2>{totalCount} Results</h2>}
      </div>

      <div className="product-listing__sort">
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

      <div className="product-listing__results">
        {/* Add link to previous page. This helps on SEO */}
        {prev !== false && (
          <div className="product-listing__pagination product-listing__pagination--top">
            <GatsbySeo linkTags={[{ rel: 'prev', href: prev.link }]} />
            <LinkButton
              onClick={(e) => {
                e.currentTarget.blur()
                e.preventDefault()
                addPrevPage()
              }}
              href={prev.link}
              rel="prev"
              variant="secondary"
              iconPosition="left"
              icon={<ArrowLeftIcon size={16} weight="bold" />}
            >
              Previous Page
            </LinkButton>
          </div>
        )}

        {/* Render ALL products */}
        {pages.map((page) => {
          return data ? (
            <Suspense
              fallback={
                <div className="product-listing__data-loading">Loading…</div>
              }
              key={`gallery-page-${page}`}
            >
              <GalleryPage
                showSponsoredProducts={false}
                key={`gallery-page-${page}`}
                fallbackData={page === searchState.page ? data : undefined}
                page={page}
                title={title}
              />
            </Suspense>
          ) : (
            <div className="product-listing__data-loading">Loading…</div>
          )
        })}

        {/* Prefetch Previous and Next pages */}
        {prev !== false && (
          <Suspense fallback={null}>
            <GalleryPage
              showSponsoredProducts={false}
              page={prev.cursor}
              display={false}
              title={title}
            />
          </Suspense>
        )}
        {next !== false && (
          <Suspense fallback={null}>
            <GalleryPage
              showSponsoredProducts={false}
              page={next.cursor}
              display={false}
              title={title}
            />
          </Suspense>
        )}

        {/* Add link to next page. This helps on SEO */}
        {next !== false && (
          <div className="product-listing__pagination product-listing__pagination--bottom">
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
  )
}

export default ProductGallery
