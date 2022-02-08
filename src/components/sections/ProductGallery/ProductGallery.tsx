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

interface Props {
  title: string
  slug?: string
}

function ProductGallery({ title, slug }: Props) {
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data } = useGalleryQuery()

  const facets = data?.search.facets
  const totalCount = data?.search.products.pageInfo.totalCount ?? 0
  const { next, prev } = usePagination(totalCount)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  if (!facets?.length) {
    return <div className="product-listing__data-loading">Loading…</div>
  }

  return (
    <div className="product-listing / grid-content-full">
      <div className="product-listing__content-grid / grid-content">
        <div className="product-listing__filters">
          <Filter
            slug={slug}
            isOpen={isFilterOpen}
            facets={facets}
            onDismiss={() => setIsFilterOpen(false)}
          />
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
              <Sort />

              <Button
                className="button display-mobile"
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
              {pages.map((page) => (
                <GalleryPage
                  showSponsoredProducts={false}
                  key={`gallery-page-${page}`}
                  fallbackData={page === searchState.page ? data : undefined}
                  page={page}
                  title={title}
                />
              ))}

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
          <div className="product-listing__data-loading">Loading…</div>
        )}
      </div>
    </div>
  )
}

export default ProductGallery
