import type { ReactNode } from 'react'
import React from 'react'

interface ImageGalleryProps {
  imageSrc: string
}

const ImageGalleryZoom = (props: ImageGalleryProps) => {
  return <img src={props.imageSrc} />
}

export default ImageGalleryZoom
