import React, { useMemo } from 'react'
import type { HTMLAttributes } from 'react'

import { ImageGalleryContext } from './useImageGallery'

export type ImageGalleryProps = ImageGalleryContext &
  HTMLAttributes<HTMLDivElement>

const ImageGalleryProvider = ({
  name,
  children,
  selectedImage,
  onChange,
  ...otherProps
}: ImageGalleryProps) => {
  const contextValues = useMemo(() => {
    return { name, selectedImage, onChange }
  }, [name, selectedImage, onChange])

  return (
    <ImageGalleryContext.Provider value={contextValues}>
      <div {...otherProps}>{children}</div>
    </ImageGalleryContext.Provider>
  )
}

export default ImageGalleryProvider
