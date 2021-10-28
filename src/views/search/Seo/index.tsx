import { useSession } from '@faststore/sdk'
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import React from 'react'
import type { SearchSeoFragment_SiteFragment } from '@generated/graphql'

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
        title,
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
