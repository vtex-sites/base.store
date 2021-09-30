import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { Carousel as UICarousel } from '@vtex/store-ui'
import { Link } from 'gatsby'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import imagesConf from 'src/images/config'

import * as styles from './Carousel.module.css'

interface Image {
  srcSet: string
}

interface Item {
  desktop: Image
  mobile: Image
  alt: string
  href: string
}

interface Props {
  allItems: Item[]
}

const useImages = (items: Item[]) => {
  const getImage = useGetThumborImageData()

  return useMemo(
    () =>
      items.map((item) => {
        const { desktop, mobile, alt, href } = item

        const mobileImage = getImage({
          baseUrl: mobile.srcSet,
          ...imagesConf['carousel.mobile'],
        })

        const desktopImage = getImage({
          baseUrl: desktop.srcSet,
          ...imagesConf['carousel.desktop'],
        })

        return {
          alt,
          href,
          image: withArtDirection(mobileImage, [
            {
              media: '(max-width: 40em)',
              image: desktopImage,
            },
          ]),
        }
      }),
    [items, getImage]
  )
}

function Carousel({ allItems }: Props) {
  const images = useImages(allItems)

  return (
    <UICarousel>
      {images.map(({ image, href, alt }, index) => (
        <Link key={`carousel-item-${index}`} to={href}>
          <GatsbyImage className={styles.image} image={image} alt={alt} />
        </Link>
      ))}
    </UICarousel>
  )
}

export default Carousel
