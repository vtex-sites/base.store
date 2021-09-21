import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import type { CollectionSeoFragment_StoreCollectionFragment } from '@generated/CollectionSeoFragment_storeCollection.graphql'
import type { CollectionSeoFragment_SiteFragment } from '@generated/CollectionSeoFragment_site.graphql'

import { useMetadata } from './hooks/useMetadata'

interface Props {
  slug: string
  site: CollectionSeoFragment_SiteFragment
  storeCollection: CollectionSeoFragment_StoreCollectionFragment
}

function Seo({
  site,
  slug,
  storeCollection: { seo: collectionSeo, breadcrumbList },
}: Props) {
  const siteMetadata = site.siteMetadata!
  const metadata = useMetadata({
    titleTemplate: siteMetadata.titleTemplate!,
    title: collectionSeo.title || siteMetadata.title!,
    description: collectionSeo.description || siteMetadata.description!,
    canonical: `/${slug}/`,
  })

  return (
    <>
      <GatsbySeo {...metadata} defer />
      <BreadcrumbJsonLd
        itemListElements={breadcrumbList.itemListElement}
        defer
      />
    </>
  )
}

export const fragment = graphql`
  fragment CollectionSeoFragment_storeCollection on StoreCollection {
    seo {
      title
      description
    }
    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }
  }
  fragment CollectionSeoFragment_site on Site {
    siteMetadata {
      titleTemplate
      title
      description
    }
  }
`

export default Seo
