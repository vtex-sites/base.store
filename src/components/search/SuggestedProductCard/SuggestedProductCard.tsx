import React from 'react'
import { Card, CardContent, CardImage } from '@faststore/ui'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import './suggested-product-card.scss'

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

function SuggestedProductCard({
  // TODO: Add Props interface and define `product` type
  product = PRODUCTS,
}) {
  const [
    {
      name,
      listPrice,
      price,
      image: [img],
    },
  ] = product

  return (
    <Card
      className="suggested-product-card"
      data-testid="suggested-product-card"
    >
      <CardContent>
        <CardImage>
          <Image
            baseUrl={img.url}
            alt={img.alternateName}
            sourceWidth={360}
            aspectRatio={1}
            breakpoints={[50, 100, 150]}
            layout="constrained"
            backgroundColor="#f0f0f0"
            options={{
              fitIn: true,
            }}
          />
        </CardImage>
        <div data-suggested-product-card-summary>
          <div data-suggested-product-card-title>
            <p className="text-body">{name}</p>
          </div>
          <span data-suggested-product-card-prices>
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
              classes="title-subsection"
              SRText="Price:"
            />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default SuggestedProductCard
