import { useMemo } from 'react'
import type { SourceHTMLAttributes } from 'react'

import { urlBuilder } from './thumborUrlBuilder'
import type { ThumborOptions } from './thumborUrlBuilder'

export interface SourceProps extends SourceHTMLAttributes<HTMLSourceElement> {
  src: string
  width: number
  height: number
  media: string
}

export interface SourceOptions extends SourceProps {
  options?: ThumborOptions
}

export interface SourceHTMLAttributesPreload
  extends SourceHTMLAttributes<HTMLSourceElement> {
  preloadLinks: string[]
}

const FACTORS = [1, 2, 3]

export const useSources = (
  sourcesOptions: SourceOptions[]
): SourceHTMLAttributesPreload[] => {
  return useMemo(() => {
    return sourcesOptions.map((sourceOption) => {
      const { src: baseUrl, width, height, media, options = {} } = sourceOption

      const builder = urlBuilder(baseUrl, options)

      const srcs = FACTORS.map((factor) => {
        const rescaledWidth = width * factor

        return `${builder(rescaledWidth, height * factor)} ${rescaledWidth}w`
      })

      const preloadLinks = srcs.map((src) => src.split(' ')[0])

      return { media, srcSet: srcs.join(', '), preloadLinks }
    })
  }, [sourcesOptions])
}
