import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import type {
  CollectionSeoFragment_SiteFragment,
  CollectionSeoFragment_StoreCollectionFragment,
} from '@generated/graphql'

import { useMetadata } from './hooks/useMetadata'

interface Props {
  title: string
  slug: string
  site: CollectionSeoFragment_SiteFragment
  storeCollection: CollectionSeoFragment_StoreCollectionFragment
}

function Seo({
  title,
  site,
  slug,
  storeCollection: { seo: collectionSeo, breadcrumbList },
}: Props) {
  const siteMetadata = site.siteMetadata!
  const metadata = useMetadata({
    title,
    titleTemplate: siteMetadata.titleTemplate!,
    description: collectionSeo.description || siteMetadata.description!,
    canonical: `/${slug}/`,
  })

  return (
    <>
      <GatsbySeo {...metadata} title={title} defer />
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
