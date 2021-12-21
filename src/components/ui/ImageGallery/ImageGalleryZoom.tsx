import type { ReactNode } from 'react'
import React from 'react'

interface ImageGalleryProps {
  displayImage: ReactNode
}

const ImageGalleryZoom = (props: ImageGalleryProps) => {
  return <div>{props.displayImage}</div>
}

export default ImageGalleryZoom
