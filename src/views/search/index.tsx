import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import type { FC } from 'react'
import type { Props as PageProps } from 'src/pages/s/[...]'

import Seo from './Seo'

type Props = PageProps

const View: FC<Props> = (props) => {
  const { data } = props

  const { site } = data
  const title = site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* TODO: Move seo components to SSG */}
      {site && <Seo title={title} site={site} />}

      <h1 className="absolute top-[-100px]">{title}</h1>

      {/* UI components */}
      <ProductGallery title="Search Results" />
    </>
  )
}

export default View
