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

  if (!site.siteMetadata) {
    console.error(`Missing site metadata on search page with title ${title}.`)

    return null
  }

  const { titleTemplate, description } = site.siteMetadata

  if (!titleTemplate) {
    console.warn(
      `Missing 'titleTemplate' in site metadata on search page with title ${title}.`
    )
  }

  if (!description) {
    console.warn(
      `Missing 'description' in site metadata on search page with title ${title}.`
    )
  }

  return (
    <GatsbySeo
      noindex
      nofollow={false}
      language={locale}
      title={title}
      description={description ?? ''}
      titleTemplate={titleTemplate ?? ''}
      openGraph={{
        type: 'website',
        title,
        description: description ?? '',
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
