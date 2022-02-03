import React from 'react'
import ReactSlick from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Image } from 'src/components/ui/Image'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

type Props = {
  products: ProductSummary_ProductFragment[]
}

function Slider({ products }: Props) {
  // TODO: Make controll settings via props
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }

  return (
    <ReactSlick {...settings}>
      {products.map((product) => (
        <Image
          baseUrl={product.image[0].url}
          alt={product.name}
          key={`${product.id}`}
          layout="fullWidth"
          backgroundColor="#f0f0f0"
          loading="eager"
          options={{
            fitIn: true,
          }}
        />
      ))}
    </ReactSlick>
  )
}

export default Slider
