import type { ReactNode } from 'react'
import React, { useState } from 'react'

import { ImageGalleryProvider, ImageGallerySelector, ImageGalleryZoom } from '.'

function ImageGallery() {
  const [currentImage, setCurrentImage] = useState<ReactNode>()

  return (
    <>
      <ImageGalleryProvider name="image-gallery" selectedImage={currentImage}>
        <ImageGalleryZoom displayImage={currentImage} />

        <ImageGallerySelector
          imagesPerPage={4}
          style={{ overflow: 'hidden', width: '30%' }}
          onClick={() =>
            setCurrentImage(
              <img
                alt=""
                height={150}
                src="https://placekitten.com/408/287"
                width={150}
              />
            )
          }
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
            src="https://i5.walmartimages.com/asr/b20a7928-fc8a-4b9f-a923-27448facface.c9df6f17cdf584784c1c40fbfc6354af.jpeg?odnHeight=612odnWidth=612odnBg=FFFFFF"
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
          <img
            alt=""
            height={150}
            src="https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F177402%2Fneque.jpg"
            width={150}
          />
          <img
            alt=""
            height={150}
            src="https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F155949%2Fvoluptas.jpg"
            width={150}
          />
          <img
            alt=""
            height={150}
            src="https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F158554%2Fquasi.jpg"
            width={150}
          />
          <img
            alt=""
            height={150}
            src="https://thumbor-dev-server.vtex.io/unsafe/fit-in/360x360/center/middle/http%3A%2F%2Fstoreframework.vtexassets.com%2Farquivos%2Fids%2F176494%2Fsuscipit.jpg"
            width={150}
          />
        </ImageGallerySelector>
      </ImageGalleryProvider>
    </>
  )
}

export default ImageGallery
