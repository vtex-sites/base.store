import type { ImgHTMLAttributes } from 'react'
import React from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  name: string
}

function IconSVG({
  name,
  width = '24px',
  height = '24px',
  loading = 'lazy',
  ...otherProps
}: Props) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
      width={width}
      height={height}
      loading={loading}
      {...otherProps}
    />
  )
}

export default IconSVG
