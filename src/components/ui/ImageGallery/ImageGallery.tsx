import { useState } from 'react'
import { Image } from 'src/components/ui/Image'

import { ImageGallerySelector, ImageZoom } from '.'

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
    <section
      data-fs-image-gallery={images.length > 1 ? 'has-selector' : 'true'}
    >
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
        <ImageGallerySelector
          images={images}
          currentImageIdx={selectedImageIdx}
          onSelect={setSelectedImageIdx}
        />
      )}
    </section>
  )
}

export default ImageGallery
