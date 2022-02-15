import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'

import './product-listing.scss'

type Props = {
  title: string
  slug?: string
}

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
