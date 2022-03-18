import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import React, { memo, useMemo } from 'react'
import type { ThumborImageOptions } from '@vtex/gatsby-plugin-thumbor'
import type { GatsbyImageProps } from 'gatsby-plugin-image'

interface Props extends Omit<GatsbyImageProps, 'image'>, ThumborImageOptions {}

function Image({
  baseUrl,
  width,
  height,
  sourceWidth,
  sourceHeight,
  aspectRatio,
  layout,
  placeholderURL,
  backgroundColor,
  breakpoints,
  options,
  ...imgProps
}: Props) {
  const getImage = useGetThumborImageData()
  const image = useMemo(
    () =>
      getImage({
        baseUrl,
        width,
        height,
        sourceWidth,
        sourceHeight,
        aspectRatio,
        layout,
        placeholderURL,
        backgroundColor,
        breakpoints,
        options,
      }),
    [
      aspectRatio,
      backgroundColor,
      baseUrl,
      breakpoints,
      getImage,
      height,
      layout,
      options,
      placeholderURL,
      sourceHeight,
      sourceWidth,
      width,
    ]
  )

  return (
    <img
      data-store-img
      width={image.width}
      height={image.height}
      src={image.images.fallback?.src}
      sizes={image.images.fallback?.sizes}
      srcSet={image.images.fallback?.srcSet}
      {...imgProps}
      alt={imgProps.alt}
    />
  )

  // return <GatsbyImage {...imgProps} image={image} />
}

export default memo(Image)
