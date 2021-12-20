import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'
import type { GatsbyImageProps } from 'gatsby-plugin-image'

interface Props extends Omit<GatsbyImageProps, 'image'> {
  desktop: {
    src: string
    variant: string
  }
  mobile: {
    src: string
    variant: string
  }
}

function ImageWithArtDirection({ mobile, desktop, ...imgProps }: Props) {
  const { src: mobileSrc, variant: mobileVariant } = mobile
  const { src: desktopSrc, variant: desktopVariant } = desktop
  const getImage = useGetThumborImageData()
  const image = useMemo(() => {
    const mobileImage = getImage({
      baseUrl: mobileSrc,
      ...imagesConf[mobileVariant],
    })

    const desktopImage = getImage({
      baseUrl: desktopSrc,
      ...imagesConf[desktopVariant],
    })

    return withArtDirection(mobileImage, [
      {
        media: '(min-width: 40em)',
        image: desktopImage,
      },
    ])
  }, [desktopSrc, desktopVariant, getImage, mobileSrc, mobileVariant])

  return <GatsbyImage {...imgProps} image={image} />
}

export default ImageWithArtDirection
