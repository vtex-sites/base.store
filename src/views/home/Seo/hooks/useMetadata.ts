import { useSession } from '@faststore/sdk'
import type { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { ComponentPropsWithoutRef } from 'react'

import type { Props } from '..'

type Options = Props & { title: string }

export const useMetadata = (
  props: Options
): ComponentPropsWithoutRef<typeof GatsbySeo> => {
  const { locale } = useSession()
  const {
    location: { pathname, host },
    data: { site },
    title,
  } = props

  if (!site || !site.siteMetadata) {
    throw new Error(`useMetadata: missing site metadata.`)
  }

  const { titleTemplate, description } = site.siteMetadata

  if (!titleTemplate) {
    console.warn(`useMetadata: missing 'titleTemplate' from site metadata.`)
  }

  if (!description) {
    console.warn(`useMetadata: missing 'description' from site metadata.`)
  }

  const siteUrl = `https://${host}${pathname}`

  return {
    title,
    description: site.siteMetadata.description ?? undefined,
    titleTemplate: site.siteMetadata.titleTemplate ?? undefined,
    language: locale,
    canonical: siteUrl,
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: site.siteMetadata.title ?? undefined,
      description: site.siteMetadata.description ?? undefined,
    },
  }
}
