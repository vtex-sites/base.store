import { useSearch } from '@faststore/sdk'
import React, { useMemo, lazy, Suspense } from 'react'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import Sentinel from 'src/sdk/search/Sentinel'
import type { ProductsQueryQuery } from '@generated/graphql'

import ProductTiles from '../ProductTiles'

const ProductGrid = lazy(() => import('src/components/product/ProductGrid'))

/* If showSponsoredProducts is true, a ProductTiles will be displayed in between two blocks of ProductGrid on the page 0 */
interface Props {
  page: number
  display?: boolean
  fallbackData?: ProductsQueryQuery
  title: string
  showSponsoredProducts?: boolean
}

function GalleryPage({
  page,
  display,
  title,
  fallbackData,
  showSponsoredProducts = true,
}: Props) {
  const {
    itemsPerPage,
    state: { sort, term, selectedFacets },
  } = useSearch()

  const productList = useProductsQuery(
    {
      first: itemsPerPage,
      after: (itemsPerPage * page).toString(),
      sort,
      term: term ?? '',
      selectedFacets,
    },
    {
      fallbackData,
      revalidateOnMount: fallbackData == null,
    }
  )

  const products = useMemo(
    () => productList?.edges.map((edge) => edge.node),
    [productList]
  )

  const productsSponsored = products?.slice(0, 2)

  const middleItemIndex = Math.ceil(itemsPerPage / 2)

  if (display === false || products == null) {
    return null
  }

  const shouldDisplaySponsoredProducts =
    showSponsoredProducts &&
    page === 0 &&
    productsSponsored !== undefined &&
    productsSponsored.length > 1

  return (
    <>
      <Sentinel
        products={products}
        page={page}
        pageSize={itemsPerPage}
        title={title}
      />
      {shouldDisplaySponsoredProducts ? (
        <>
          <ProductGrid
            products={products.slice(0, middleItemIndex)}
            page={page}
            pageSize={middleItemIndex}
          />
          <div className="product-listing__results-sponsored">
            <h3>Sponsored</h3>
            <ProductTiles products={productsSponsored.slice(0, 2)} />
          </div>
          <ProductGrid
            products={products.slice(middleItemIndex, itemsPerPage)}
            page={page}
            pageSize={middleItemIndex}
          />
        </>
      ) : (
        <Suspense
          fallback={
            <div className="product-listing__data-loading">Loading...</div>
          }
        >
          <ProductGrid
            products={products}
            page={page}
            pageSize={itemsPerPage}
          />
        </Suspense>
      )}
    </>
  )
}

export default GalleryPage
