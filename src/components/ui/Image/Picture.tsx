import type { HTMLAttributes } from 'react'
import { memo } from 'react'
import { Helmet } from 'react-helmet'

import { useSources } from './useSources'
import type { SourceOptions } from './useSources'
import type { ImageOptions } from './useImage'

interface Props extends HTMLAttributes<HTMLPictureElement> {
  sources: SourceOptions[]
  img: ImageOptions
  preload?: boolean
}

function Picture({
  sources: sourceOptions,
  img: imgProps,
  preload = false,
}: Props) {
  const sources = useSources(sourceOptions)

  return (
    <picture>
      {sources.map(({ srcSet, media, preloadLinks }, index) => {
        return (
          <>
            {preload && (
              <Helmet
                link={preloadLinks.map(
                  (href: string) =>
                    ({
                      as: 'image',
                      rel: 'preload',
                      href,
                      media,
                    } as any)
                )}
              />
            )}
            <source key={index} srcSet={srcSet} media={media} />
          </>
        )
      })}
      <img {...imgProps} alt={imgProps.alt} />
    </picture>
  )
}

export default memo(Picture)
