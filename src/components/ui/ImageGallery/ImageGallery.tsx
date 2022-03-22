import { Button } from '@faststore/ui'
import { useState } from 'react'
import { Image } from 'src/components/ui/Image'

import { ImageGallerySelector, ImageZoom } from '.'

import './image-gallery.scss'

export interface ImageElementData {
  url: string
  alternateName: string
}

interface ImageGalleryProps {
  images: ImageElementData[]
}

// const imgOptions = {
//   sourceWidth: 1024,
//   backgroundColor: '#f0f0f0',
//   layout: 'constrained' as const,
//   sizes: '(max-width: 768px) 25vw, 50vw',
//   breakpoints: [360, 720, 1024],
//   aspectRatio: 4 / 3,
// }

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const currentImage = images[selectedImageIdx]

  return (
    <section data-image-gallery>
      <ImageZoom>
        <Image
          src={currentImage.url}
          alt={currentImage.alternateName}
          width={250}
          height={250}
          loading="eager"
        />
      </ImageZoom>
      {images.length > 1 && (
        <ImageGallerySelector itemsPerPage={4}>
          {images.map((image, idx) => {
            return (
              <Button
                key={idx}
                data-thumbnail-button={
                  idx === selectedImageIdx ? 'selected' : 'true'
                }
                aria-label={`Load ${image.alternateName} - Image ${
                  idx + 1
                } of ${images.length}`}
                onClick={() => {
                  setSelectedImageIdx(idx)
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alternateName}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  width={250}
                  height={250}
                />
              </Button>
            )
          })}
        </ImageGallerySelector>
      )}
    </section>
  )
}

export default ImageGallery
