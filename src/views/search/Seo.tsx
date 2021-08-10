import React from 'react'
import { SearchSEO as SearchSeo } from '@vtex/gatsby-theme-store'
import type { FC } from 'react'

import type { SearchViewProps } from '.'

type Props = SearchViewProps

interface Breadcrumb {
  name: string
  href: string
}

const Seo: FC<Props> = ({ data }) => {
  const siteMetadata = data.cmsSeo!.seo!.siteMetadata!
  const breadcrumb = (data.vtex.facets!.breadcrumb! as Breadcrumb[]) ?? []

  return (
    <SearchSeo
      titleTemplate={siteMetadata.titleTemplate!}
      title={siteMetadata.title!}
      description={siteMetadata.description!}
      breadcrumb={breadcrumb}
    />
  )
}

export default Seo
