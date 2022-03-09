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
import SkeletonElement from 'src/components/skeletons/SkeletonElement'
import FilterSkeleton from 'src/components/skeletons/FilterSkeleton'
import ProductGrid from 'src/components/product/ProductGrid'

import GalleryPage from './ProductGalleryPage'
import EmptyGallery from './EmptyGallery'
import { useGalleryQuery } from './useGalleryQuery'
import { useOrderedFacets } from './useOrderedFacets'

import './product-gallery.scss'

interface Props {
  title: string
}

function ProductGallery({ title }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()
  const totalCount = data?.search.products.pageInfo.totalCount ?? 0
  const orderedFacets = useOrderedFacets(data)
  const { next, prev } = usePagination(totalCount)

  if (data && totalCount === 0) {
    return (
      <div className="product-listing / grid-content">
        <EmptyGallery />
      </div>
    )
  }

  return (
    <div className="product-listing / grid-content-full">
      <div className="product-listing__content-grid / grid-content">
        <div className="product-listing__filters">
          <FilterSkeleton loading={orderedFacets?.length === 0}>
            <Filter
              isOpen={isFilterOpen}
              facets={orderedFacets}
              onDismiss={() => setIsFilterOpen(false)}
            />
          </FilterSkeleton>
        </div>

        <div className="product-listing__results-count" data-count={totalCount}>
          <SkeletonElement shimmer type="text" loading={!data}>
            <h2 data-testid="total-product-count">{totalCount} Results</h2>
          </SkeletonElement>
        </div>

        <div className="product-listing__sort">
          <SkeletonElement
            shimmer
            type="text"
            loading={orderedFacets?.length === 0}
          >
            <Sort />
          </SkeletonElement>

          <SkeletonElement
            shimmer
            type="button"
            loading={orderedFacets?.length === 0}
          >
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
          </SkeletonElement>
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
          {data ? (
            <>
              {pages.map((page) => (
                <GalleryPage
                  key={`gallery-page-${page}`}
                  showSponsoredProducts={false}
                  fallbackData={page === searchState.page ? data : undefined}
                  page={page}
                  title={title}
                />
              ))}
            </>
          ) : (
            <ProductGrid page={0} pageSize={0} products={[]} />
          )}

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
