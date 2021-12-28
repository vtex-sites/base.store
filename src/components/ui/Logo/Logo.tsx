import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

function Logo() {
  return (
    <StaticImage
      src="../logo.png"
      alt="Faststore logo"
      width={178}
      height={38}
    />
  )
}

export default Logo
