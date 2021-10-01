import React from 'react'
import { useSession } from '@vtex/store-sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { graphql } from 'gatsby'
import type { SearchSeoFragment_SiteFragment } from '@generated/SearchSeoFragment_site.graphql'

interface Props {
  site: SearchSeoFragment_SiteFragment
  title: string
}

function Seo({ site, title }: Props) {
  const { locale } = useSession()
  const { titleTemplate, description } = site.siteMetadata!

  return (
    <GatsbySeo
      noindex
      nofollow={false}
      language={locale}
      title={title}
      description={description!}
      titleTemplate={titleTemplate!}
      openGraph={{
        type: 'website',
        title: title!,
        description: description!,
      }}
      defer
    />
  )
}

export const fragment = graphql`
  fragment SearchSeoFragment_site on Site {
    siteMetadata {
      titleTemplate
      title
      description
    }
  }
`

export default Seo
