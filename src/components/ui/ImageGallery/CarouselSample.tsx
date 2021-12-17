import React from 'react'
import { Carousel } from '@faststore/ui'

// this file is just a sample of how to use the Carousel component
// need to be deleted before publishing
function CarouselSample() {
  return (
    <Carousel
      controls="navigationArrows"
      transition={{
        duration: 400,
        property: 'transform',
      }}
    >
      <img
        alt=""
        height={500}
        src="https://a-static.mlcdn.com.br/618x463/camisa-polo-masculina-marca-toq-ref/toqref/3126fd0eed8011eb97a34201ac18500e/6d07820c64d1d772ba895025ad7db4e5.jpg"
        width={380}
      />
      <img
        alt=""
        height={500}
        src="https://a-static.mlcdn.com.br/618x463/camisa-polo-masculina-marca-toq-ref/toqref/e20bc1ce128611ec940d4201ac185013/b73fb33386423bef5adab8ced7b4db51.jpg"
        width={380}
      />
    </Carousel>
  )
}

export default CarouselSample
