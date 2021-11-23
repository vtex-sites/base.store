import React from 'react'
import ProductGallery from 'src/components/sections/ProductGallery'
import type { Props as PageProps } from 'src/pages/{StoreCollection.slug}/[...]'

import Seo from './Seo'

type Props = PageProps

function View(props: Props) {
  const {
    pageContext: { slug },
    data,
  } = props

  const { storeCollection, site } = data

  const title =
    data.storeCollection?.seo.title ?? data.site?.siteMetadata?.title ?? ''

  return (
    <>
      {/* TODO: Move seo components to SSG */}
      {storeCollection && site && (
        <Seo
          title={title}
          slug={slug}
          site={site}
          storeCollection={storeCollection}
        />
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
