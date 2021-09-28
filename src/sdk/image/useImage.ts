/**
 * TODO:
 * gatsby-plugin-image currently blinks on SSR when the image is already loaded before hydration.
 * Eventually they will fix this issue in here: https://github.com/gatsbyjs/gatsby/issues/32037
 *
 * When they release this, we need to remember upgrading gatsby-plugin-image and this issue will be fixed
 */
import { useGetThumborImageData } from '@vtex/gatsby-plugin-thumbor'
import { useMemo } from 'react'
import imagesConf from 'src/images/config'

export const useImage = (src: string, variant: string) => {
  const getImage = useGetThumborImageData()

  return useMemo(
    () =>
      getImage({
        baseUrl: src,
        ...imagesConf[variant],
      }),
    [getImage, src, variant]
  )
}
