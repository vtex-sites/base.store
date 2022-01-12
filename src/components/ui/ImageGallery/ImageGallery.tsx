import { Button } from '@faststore/ui'
import React, { useState } from 'react'
import { Image } from 'src/components/ui/Image'

import { ImageGallerySelector, ImageZoom } from '.'

export interface ImageElementData {
  url: string
  alternateName: string
}

interface ImageGalleryProps {
  images: ImageElementData[]
}

const detailsImage = {
  sourceWidth: 720,
  aspectRatio: 1,
  width: 720,
  breakpoints: [250, 360, 480, 720],
  layout: 'constrained' as const,
  backgroundColor: '#f0f0f0',
  options: {
    fitIn: true,
  },
}

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const currentImage = images[selectedImageIdx]

  return (
    <div>
      <ImageZoom>
        <Image
          baseUrl={currentImage.url}
          alt={currentImage.alternateName}
          loading="eager"
          {...detailsImage}
        />
      </ImageZoom>
      <ImageGallerySelector itemsPerPage={4}>
        {images.map((image, idx) => {
          return (
            <Button
              key={idx}
              data-thumbnail-button={
                idx === selectedImageIdx ? 'selected' : 'true'
              }
              aria-label={`Load ${image.alternateName} - Image ${idx + 1} of ${
                images.length
              }`}
              onClick={() => {
                setSelectedImageIdx(idx)
              }}
            >
              <Image
                baseUrl={image.url}
                alt={image.alternateName}
                loading={idx === 0 ? 'eager' : 'lazy'}
                {...detailsImage}
              />
            </Button>
          )
        })}
      </ImageGallerySelector>
    </div>
  )
}

export default ImageGallery
