import React from 'react'

interface ImageGalleryProps {
  imageSrc?: string
}

const ImageGalleryZoom = (props: ImageGalleryProps) => {
  return <img alt="Product gallery" src={props.imageSrc} />
}

export default ImageGalleryZoom
