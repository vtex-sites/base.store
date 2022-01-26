import { useSearch } from '@faststore/sdk'
import React, { useMemo } from 'react'
import ProductGrid from 'src/components/product/ProductGrid'
import Sentinel from 'src/sdk/search/Sentinel'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductTiles from '../ProductTiles'

interface Props {
  page: number
  display?: boolean
  products?: ProductSummary_ProductFragment[]
  title: string
  showSponsoredProducts?: boolean
}

function GalleryPageStatic({
  page,
  display,
  title,
  products,
  showSponsoredProducts = true,
}: Props) {
  const { itemsPerPage } = useSearch()

  const productsSponsored = useMemo(() => products?.slice(0, 2), [products])

  const middleItemIndex = Math.ceil(itemsPerPage / 2)
  const beforeSponsoredProducts = useMemo(
    () => products?.slice(0, middleItemIndex) ?? [],
    [products, middleItemIndex]
  )

  const afterSponsoredProducts = useMemo(
    () => products?.slice(middleItemIndex, itemsPerPage) ?? [],
    [products, middleItemIndex, itemsPerPage]
  )

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
            products={beforeSponsoredProducts}
            page={page}
            pageSize={middleItemIndex}
          />
          <div className="product-listing__results-sponsored">
            <h3>Sponsored</h3>
            <ProductTiles products={productsSponsored} />
          </div>
          <ProductGrid
            products={afterSponsoredProducts}
            page={page}
            pageSize={middleItemIndex}
          />
        </>
      ) : (
        <ProductGrid products={products} page={page} pageSize={itemsPerPage} />
      )}
    </>
  )
}

export default GalleryPageStatic
