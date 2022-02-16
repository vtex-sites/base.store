import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import {
  ArrowLeft as ArrowLeftIcon,
  FadersHorizontal as FadersHorizontalIcon,
} from 'phosphor-react'
import React, { useState } from 'react'
import Filter from 'src/components/search/Filter'
import Sort from 'src/components/search/Sort'
import Button, { LinkButton } from 'src/components/ui/Button'

import GalleryPage from './ProductGalleryPage'
import { useGalleryQuery } from './useGalleryQuery'
import { useOrderedFacets } from './useOrderedFacets'
import { useTotalCount } from './useTotalCount'

import './product-gallery.scss'

interface Props {
  title: string
  slug?: string
}

function ProductGallery({ title, slug }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()
  const totalCount = useTotalCount(data)
  const orderedFacets = useOrderedFacets(data)
  const { next, prev } = usePagination(totalCount)

  return (
    <div className="product-listing / grid-content-full">
      <div className="product-listing__content-grid / grid-content">
        <div className="product-listing__filters">
          <Filter
            slug={slug}
            isOpen={isFilterOpen}
            facets={orderedFacets}
            onDismiss={() => setIsFilterOpen(false)}
          />
        </div>

        <div
          className="product-listing__results-count"
          data-testid="total-product-count"
          data-count={totalCount}
        >
          <h2>{totalCount} Results</h2>
        </div>

        <div className="product-listing__sort">
          <Sort />

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
                to={prev.link}
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
          <div className="product-listing__data-grid">
            {data &&
              pages.map((page) => (
                <GalleryPage
                  key={`gallery-page-${page}`}
                  showSponsoredProducts={false}
                  fallbackData={page === searchState.page ? data : undefined}
                  page={page}
                  title={title}
                />
              ))}
          </div>

          {/* Prefetch Previous and Next pages */}
          {prev !== false && (
            <GalleryPage
              showSponsoredProducts={false}
              page={prev.cursor}
              display={false}
              title={title}
            />
          )}
          {next !== false && (
            <GalleryPage
              showSponsoredProducts={false}
              page={next.cursor}
              display={false}
              title={title}
            />
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
                to={next.link}
                rel="next"
                variant="secondary"
              >
                Load more products
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductGallery
