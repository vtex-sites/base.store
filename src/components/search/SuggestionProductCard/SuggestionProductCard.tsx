import React from 'react'
import { Card, CardContent, CardImage } from '@faststore/ui'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './suggestion-product-card.scss'

// TODO: Remove it when integration is complete
const PRODUCTS = [
  {
    price: 46.26,
    listPrice: 72.06,
    name: 'Ergonomic Wooden Bacon',
    image: [
      {
        alternateName: 'rerum',
        url: 'http://storeframework.vtexassets.com/arquivos/ids/167285/ut.jpg?v=637753017045600000',
      },
    ],
  },
]

const imgOptions = {
  width: 56,
  sourceWidth: 360,
  aspectRatio: 1,
  breakpoints: [50, 100, 150],
  layout: 'constrained' as const,
  backgroundColor: '#f0f0f0',
}

function SuggestionProductCard({
  // TODO: Add Props interface and define `product` type
  product = PRODUCTS[0],
}) {
  const {
    name,
    listPrice,
    price,
    image: [img],
  } = product

  return (
    <Card
      className="suggestion-product-card"
      data-testid="suggestion-product-card"
    >
      <CardContent>
        <CardImage>
          <Image baseUrl={img.url} alt={img.alternateName} {...imgOptions} />
        </CardImage>
        <div data-suggestion-product-card-summary>
          <p
            className="title-sub-subsection"
            data-suggestion-product-card-title
          >
            {name}
          </p>
          <span data-suggestion-product-card-prices>
            <Price
              value={listPrice}
              formatter={useFormattedPrice}
              testId="list-price"
              data-value={listPrice}
              variant="listing"
              classes="text-body-small"
              SRText="Original price:"
            />
            <Price
              value={price}
              formatter={useFormattedPrice}
              testId="price"
              data-value={price}
              variant="spot"
              classes="title-sub-subsection"
              SRText="Price:"
            />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default SuggestionProductCard
