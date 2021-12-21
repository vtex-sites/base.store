import React, { useMemo } from 'react'
import type { HTMLAttributes } from 'react'

import { ImageGalleryContext } from './useImageGallery'

export type ImageGalleryProps = ImageGalleryContext &
  HTMLAttributes<HTMLDivElement>

const ImageGalleryProvider = ({
  name,
  children,
  selectedImageData,
  onClick,
  ...otherProps
}: ImageGalleryProps) => {
  const contextValues = useMemo(() => {
    return { name, selectedImageData, onClick }
  }, [name, selectedImageData, onClick])

  return (
    <ImageGalleryContext.Provider value={contextValues}>
      <div {...otherProps}>{children}</div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGalleryProvider
