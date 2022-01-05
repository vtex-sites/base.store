import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import type { ThumborImageOptions } from '@vtex/gatsby-plugin-thumbor'
import type { GatsbyImageProps } from 'gatsby-plugin-image'

interface Props extends Omit<GatsbyImageProps, 'image'> {
  desktop: ThumborImageOptions
  mobile: ThumborImageOptions
}

function ImageWithArtDirection({ mobile, desktop, ...imgProps }: Props) {
  const getImage = useGetThumborImageData()
  const image = useMemo(() => {
    const mobileImage = getImage(mobile)
    const desktopImage = getImage(desktop)

    return withArtDirection(mobileImage, [
      {
        media: '(min-width: 40em)',
        image: desktopImage,
      },
    ])
  }, [desktop, getImage, mobile])

  return <GatsbyImage {...imgProps} image={image} />
}

export default ImageWithArtDirection
