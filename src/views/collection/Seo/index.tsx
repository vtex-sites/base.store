import { graphql } from 'gatsby'
import { BreadcrumbJsonLd, GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import type { CollectionSeoFragment_StoreCollectionFragment } from '@generated/CollectionSeoFragment_storeCollection.graphql'
import type { CollectionSeoFragment_SiteFragment } from '@generated/CollectionSeoFragment_site.graphql'
import type { CollectionSeoFragment_BreadcrumbFragment } from '@generated/CollectionSeoFragment_breadcrumb.graphql'

import { useMetadata } from './hooks/useMetadata'
import { useBreadcrumb } from './hooks/useBreadcrumb'

interface Props {
  slug: string
  site: CollectionSeoFragment_SiteFragment
  storeCollection: CollectionSeoFragment_StoreCollectionFragment
  breadcrumb: CollectionSeoFragment_BreadcrumbFragment[]
}

function Seo({
  site,
  storeCollection: { seo: collectionSeo },
  breadcrumb,
  slug,
}: Props) {
  const siteMetadata = site.siteMetadata!

  const breadcrumbJson = useBreadcrumb({ breadcrumb })
  const metadata = useMetadata({
    titleTemplate: siteMetadata.titleTemplate!,
    title: collectionSeo.title || siteMetadata.title!,
    description: collectionSeo.description || siteMetadata.description!,
    canonical: `/${slug}/`,
  })

  return (
    <>
      <GatsbySeo {...metadata} defer />
      {breadcrumbJson && <BreadcrumbJsonLd {...breadcrumbJson} defer />}
    </>
  )
}

export const fragment = graphql`
  fragment CollectionSeoFragment_storeCollection on StoreCollection {
    seo {
      title
      description
    }
  }
  fragment CollectionSeoFragment_site on Site {
    siteMetadata {
      titleTemplate
      title
      description
    }
  }
  fragment CollectionSeoFragment_breadcrumb on VTEX_SearchBreadcrumb {
    href
    name
  }
`

export default Seo
