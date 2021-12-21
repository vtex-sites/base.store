import React, { useState } from 'react'

import type { ImageElementData } from '.'
import { ImageGalleryProvider, ImageGallerySelector, ImageGalleryZoom } from '.'

interface ImageGalleryProps {
  images: ImageElementData[]
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState<ImageElementData>(images[0])

  return (
    <>
      <ImageGalleryProvider
        name="image-gallery"
        selectedImageData={currentImage}
        onClick={(v) =>
          setCurrentImage((previousSelectedImage) => {
            const target = v.target as HTMLImageElement

            return {
              url: target.getAttribute('src') ?? previousSelectedImage.url,
              alternateName:
                target.getAttribute('alt') ??
                previousSelectedImage.alternateName,
            }
          })
        }
      >
        <ImageGalleryZoom imageData={currentImage} />

        <ImageGallerySelector
          imagesPerPage={4}
          style={{ overflow: 'hidden', width: '30%' }}
        >
          {images.map((imgData, idx) => {
            return (
              <img key={idx} src={imgData.url} alt={imgData.alternateName} />
            )
          })}
        </ImageGallerySelector>
      </ImageGalleryProvider>
    </>
  )
}

export default ImageGallery
