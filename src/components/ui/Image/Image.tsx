import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage } from 'gatsby-plugin-image'
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

  return <GatsbyImage {...imgProps} image={image} />
}

export default memo(Image)
