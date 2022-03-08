import React from 'react'
import type { SVGProps } from 'react'

type IconWeight = 'thin' | 'light' | 'regular' | 'bold'

const mapWeightToValue: Record<IconWeight, number> = {
  bold: 24,
  regular: 16,
  light: 12,
  thin: 8,
}

interface Props extends SVGProps<SVGSVGElement> {
  name: string
  weight?: IconWeight
}

function IconSVG({ name, weight = 'regular', ...otherProps }: Props) {
  return (
    <svg {...otherProps} strokeWidth={mapWeightToValue[weight]}>
      <use href={`/icons/icons.svg#${name}`} />
    </svg>
  )
}

export default IconSVG
