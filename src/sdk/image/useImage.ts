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
