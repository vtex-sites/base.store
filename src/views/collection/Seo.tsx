import React from 'react'
import { SearchSEO as SearchSeo } from '@vtex/gatsby-theme-store'
import type { FC } from 'react'

import type { CollectionViewProps } from '.'

type Props = CollectionViewProps

interface Breadcrumb {
  name: string
  href: string
}

const Seo: FC<Props> = ({ data, params }) => {
  const siteMetadata = data.cmsSeo!.seo!.siteMetadata!
  const { seo: collectionSeo } = data.storeCollection!
  const breadcrumb = (data.vtex.facets!.breadcrumb! as Breadcrumb[]) ?? []

  return (
    <SearchSeo
      titleTemplate={siteMetadata.titleTemplate!}
      title={collectionSeo.title || siteMetadata.title!}
      description={collectionSeo.description || siteMetadata.description!}
      canonical={`/${params.slug}`}
      breadcrumb={breadcrumb}
    />
  )
}

export default Seo
