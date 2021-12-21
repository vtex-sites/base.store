import type { ImgHTMLAttributes } from 'react'
import React from 'react'

import type { ImageElementData } from '.'

interface ImageGalleryProps extends ImgHTMLAttributes<HTMLImageElement> {
  imageData: ImageElementData
}

const ImageGalleryZoom = ({ imageData, ...otherProps }: ImageGalleryProps) => {
  return (
    <img alt={imageData.alternateName} src={imageData.url} {...otherProps} />
  )
}

export default ImageGalleryZoom
