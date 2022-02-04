import React from 'react'
import loadable from '@loadable/component'

import './product-listing.scss'

type Props = {
  title: string
  slug?: string
}

const ProductGallery = loadable(
  () => import('src/components/sections/ProductGallery')
)

function ProductListing({ title, slug }: Props) {
  return (
    <div className="product-listing / grid-content-full">
      <div className="product-listing__content-grid / grid-content">
        <ProductGallery title={title} slug={slug} />
      </div>
    </div>
  )
}

export default ProductListing
