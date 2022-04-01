import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React, { lazy, Suspense, useState } from 'react'
import Filter from 'src/components/search/Filter'
import Sort from 'src/components/search/Sort'
import FilterSkeleton from 'src/components/skeletons/FilterSkeleton'
import ProductGridSkeleton from 'src/components/skeletons/ProductGridSkeleton'
import SkeletonElement from 'src/components/skeletons/SkeletonElement'
import Button, { ButtonLink } from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import { mark } from 'src/sdk/tests/mark'

import Section from '../Section'
import EmptyGallery from './EmptyGallery'
import { useDelayedFacets } from './useDelayedFacets'
import { useGalleryQuery } from './useGalleryQuery'
import { useProductsPrefetch } from './usePageProducts'

const GalleryPage = lazy(() => import('./ProductGalleryPage'))
const GalleryPageSkeleton = <ProductGridSkeleton loading />

interface Props {
  title: string
  searchTerm?: string
}

function ProductGallery({ title, searchTerm }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const { pages, addNextPage, addPrevPage, state: searchState } = useSearch()

  const { data } = useGalleryQuery()
  const facets = useDelayedFacets(data)
  const totalCount = data?.search.products.pageInfo.totalCount ?? 0
  const { next, prev } = usePagination(totalCount)

  useProductsPrefetch(prev ? prev.cursor : null)
  useProductsPrefetch(next ? next.cursor : null)

  if (data && totalCount === 0) {
    return (
      <Section className="product-listing layout__content">
        <EmptyGallery />
      </Section>
    )
  }

  return (
    <Section className="product-listing layout__content-full">
      {searchTerm && (
        <header className="product-listing__search-term layout__content">
          <h1>
            Showing results for: <span>{searchTerm}</span>
          </h1>
        </header>
      )}
      <div className="product-listing__content-grid layout__content">
        <div className="product-listing__filters">
          <FilterSkeleton loading={facets?.length === 0}>
            <Filter
              isOpen={isFilterOpen}
              facets={facets}
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
          <SkeletonElement shimmer type="text" loading={facets?.length === 0}>
            <Sort />
          </SkeletonElement>

          <SkeletonElement shimmer type="button" loading={facets?.length === 0}>
            <Button
              variant="tertiary"
              data-testid="open-filter-button"
              icon={<Icon name="FadersHorizontal" width={16} height={16} />}
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
              <GatsbySeo defer linkTags={[{ rel: 'prev', href: prev.link }]} />
              <ButtonLink
                onClick={(e) => {
                  e.currentTarget.blur()
                  e.preventDefault()
                  addPrevPage()
                }}
                to={prev.link}
                rel="prev"
                variant="secondary"
                iconPosition="left"
                icon={
                  <Icon name="ArrowLeft" width={16} height={16} weight="bold" />
                }
              >
                Previous Page
              </ButtonLink>
            </div>
          )}

          {/* Render ALL products */}
          {data ? (
            <Suspense fallback={GalleryPageSkeleton}>
              {pages.map((page) => (
                <GalleryPage
                  key={`gallery-page-${page}`}
                  showSponsoredProducts={false}
                  fallbackData={page === searchState.page ? data : undefined}
                  page={page}
                  title={title}
                />
              ))}
            </Suspense>
          ) : (
            GalleryPageSkeleton
          )}

          {/* Add link to next page. This helps on SEO */}
          {next !== false && (
            <div className="product-listing__pagination product-listing__pagination--bottom">
              <GatsbySeo defer linkTags={[{ rel: 'next', href: next.link }]} />
              <ButtonLink
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
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

ProductGallery.displayName = 'ProductGallery'
export default mark(ProductGallery)
