import { useSearch } from '@faststore/sdk'
import React, { useMemo, lazy, Suspense } from 'react'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import Sentinel from 'src/sdk/search/Sentinel'
import type { ProductsQueryQuery } from '@generated/graphql'

const ProductGrid = lazy(() => import('src/components/product/ProductGrid'))
const ProductTiles = lazy(() => import('../ProductTiles'))

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

  /*
  PS.: Just for  the sake of demonstrantion, productSponsoredList was created by copying the data from
  productList, and an arbitrary page (20) was choosen to get different products.
  */
  const productSponsoredList = useProductsQuery(
    {
      first: itemsPerPage,
      after: (itemsPerPage * 20).toString(),
      sort,
      term: term ?? '',
      selectedFacets,
    },
    {
      fallbackData,
      revalidateOnMount: fallbackData == null,
    }
  )

  const productsSponsored = useMemo(
    () => productSponsoredList?.edges.map((edge) => edge.node),
    [productSponsoredList]
  )

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
          <Suspense fallback={null}>
            <ProductGrid
              products={products.slice(0, middleItemIndex)}
              page={page}
              pageSize={middleItemIndex}
            />
          </Suspense>
          <div className="product-listing__results-sponsored">
            <h3>Sponsored</h3>
            <Suspense fallback={null}>
              <ProductTiles products={productsSponsored.slice(0, 2)} />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <ProductGrid
              products={products.slice(middleItemIndex, itemsPerPage)}
              page={page}
              pageSize={middleItemIndex}
            />
          </Suspense>
        </>
      ) : (
        <ProductGrid products={products} page={page} pageSize={itemsPerPage} />
      )}
    </>
  )
}

export default GalleryPage
