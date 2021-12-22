import type { PropsWithChildren } from 'react'
import React from 'react'

interface ImageGalleryZoomProps {
  helpMessage?: string
  zoomFactor?: number
}

const ImageGalleryZoom = ({
  children,
}: PropsWithChildren<ImageGalleryZoomProps>) => {
  return <> {children} </>
}

export default ImageGalleryZoom
