import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import type { Props as PageProps } from 'src/pages/[...]'

import Seo from './Seo'

type Props = PageProps

function View(props: Props) {
  const {
    data: { site },
    serverData,
  } = props

  const collection = serverData?.collection
  const title = collection?.seo.title ?? site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* TODO: Move seo components to SSG */}
      {collection && site && (
        <Seo title={title} site={site} collection={collection} />
      )}

      <h1 data-testid="collection-page" className="absolute top-[-100px]">
        {title}
      </h1>

      {/* UI components */}
      <ProductGallery title={title} />
    </>
  )
}

export default View
