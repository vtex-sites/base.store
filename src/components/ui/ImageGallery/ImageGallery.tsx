import React, { useState } from 'react'

import { ImageGalleryProvider, ImageGallerySelector, ImageGalleryZoom } from '.'

interface ImageGalleryProps {
  images: string[]
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState<string>(images[0])

  return (
    <>
      <ImageGalleryProvider
        name="image-gallery"
        selectedImageSrc={currentImage}
        onClick={(v) =>
          setCurrentImage((previousSelectedImage) => {
            const target = v.target as HTMLImageElement

            return target.getAttribute('src') ?? previousSelectedImage
          })
        }
      >
        <ImageGalleryZoom imageSrc={currentImage} />

        <ImageGallerySelector
          imagesPerPage={4}
          style={{ overflow: 'hidden', width: '30%' }}
        >
          {images.map((imgSrc, idx) => {
            return <img alt="Product" key={idx} src={imgSrc} />
          })}
        </ImageGallerySelector>
      </ImageGalleryProvider>
    </>
  )
}

export default ImageGallery
