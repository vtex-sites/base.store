import React from 'react'

import { ImageGallery, ImageGallerySelector } from '.'

function CarouselSlider() {
  return (
    <ImageGallery name="image-gallery">
      <ImageGallerySelector
        controls="navigationArrows"
        transition={{
          duration: 400,
          property: 'transform',
        }}
      >
        <img
          alt=""
          height={150}
          src="https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F176529%2Fin.jpg"
          width={150}
        />
        <img
          alt=""
          height={150}
          src="https://a-static.mlcdn.com.br/618x463/camisa-polo-masculina-marca-toq-ref/toqref/e20bc1ce128611ec940d4201ac185013/b73fb33386423bef5adab8ced7b4db51.jpg"
          width={150}
        />
        <img
          alt=""
          height={150}
          src="https://a-static.mlcdn.com.br/618x463/camisa-polo-masculina-marca-toq-ref/toqref/3126fd0eed8011eb97a34201ac18150e/6d07820c64d1d772ba895025ad7db4e5.jpg"
          width={150}
        />
        <img
          alt=""
          height={150}
          src="https://placekitten.com/408/287"
          width={150}
        />
        <img
          alt=""
          height={150}
          src="https://placekitten.com/200/287"
          width={150}
        />
        <img
          alt=""
          height={150}
          src="https://placekitten.com/200/286"
          width={150}
        />
      </ImageGallerySelector>
    </ImageGallery>
  )
}

export default CarouselSlider
