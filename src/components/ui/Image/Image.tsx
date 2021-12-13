import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'
import type { GatsbyImageProps } from 'gatsby-plugin-image'

interface Props extends Omit<GatsbyImageProps, 'image'> {
  variant: string
  src: string
}

function Image({ variant, src, ...imgProps }: Props) {
  const getImage = useGetThumborImageData()
  const image = useMemo(
    () =>
      getImage({
        baseUrl: src,
        ...imagesConf[variant],
      }),
    [getImage, src, variant]
  )

  return <GatsbyImage {...imgProps} image={image} />
}

export default Image
