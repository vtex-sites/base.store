import { Button } from '@faststore/ui'
import React, { useState } from 'react'
import { Image } from 'src/components/ui/Image'

import { ImageGallerySelector, ImageGalleryZoom } from '.'

export interface ImageElementData {
  url: string
  alternateName: string
}

interface ImageGalleryProps {
  images: ImageElementData[]
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const currentImage = images[selectedImageIdx]

  return (
    <div>
      <ImageGalleryZoom>
        <Image
          src={currentImage.url}
          alt={currentImage.alternateName}
          variant="product.details"
          loading="eager"
        />
      </ImageGalleryZoom>
      <ImageGallerySelector itemsPerPage={4}>
        {images.map((image, idx) => {
          return (
            <Button
              key={idx}
              data-thumbnail-button
              className={image.url === currentImage.url ? 'selected' : ''}
              aria-label={`${image.alternateName} - Image ${idx + 1} of ${
                images.length
              }`}
              onClick={() => {
                setSelectedImageIdx(idx)
              }}
            >
              <Image
                src={image.url}
                alt={image.alternateName}
                variant="product.details"
                loading="eager"
              />
            </Button>
          )
        })}
      </ImageGallerySelector>
    </div>
  )
}

export default ImageGallery
