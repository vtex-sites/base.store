import React, { useState } from 'react'
import { Image } from 'src/components/ui/Image'

import { ImageGalleryProvider, ImageGallerySelector, ImageGalleryZoom } from '.'

export interface ImageElementData {
  url: string
  alternateName: string
}

interface ImageGalleryProps {
  images: ImageElementData[]
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState<ImageElementData>(images[0])

  return (
    <ImageGalleryProvider
      name="image-gallery"
      selectedImageData={currentImage}
      onClick={(v) =>
        setCurrentImage((previousSelectedImage) => {
          const target = v.target as HTMLImageElement

          return {
            url: target.getAttribute('src') ?? previousSelectedImage.url,
            alternateName:
              target.getAttribute('alt') ?? previousSelectedImage.alternateName,
          }
        })
      }
    >
      <ImageGalleryZoom>
        <Image
          alt={currentImage.alternateName}
          src={currentImage.url}
          variant="product.details"
          loading="eager"
        />
      </ImageGalleryZoom>

      <ImageGallerySelector imagesPerPage={4} images={images} />
    </ImageGalleryProvider>
  )
}

export default ImageGallery
