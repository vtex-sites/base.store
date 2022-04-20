import type { HTMLAttributes } from 'react'
import { memo } from 'react'

import { useSources } from './useSources'
import type { SourceOptions } from './useSources'
import type { ImageOptions } from './useImage'

interface Props extends HTMLAttributes<HTMLPictureElement> {
  sources: SourceOptions[]
  img: ImageOptions
}

function Picture({ sources: sourceOptions, img: imgProps }: Props) {
  const sources = useSources(sourceOptions)

  return (
    <picture>
      {sources.map(({ srcSet, media }, index) => {
        return <source key={index} srcSet={srcSet} media={media} />
      })}
      <img {...imgProps} alt={imgProps.alt} />
    </picture>
  )
}

Picture.displayName = 'Picture'
export default memo(Picture)
