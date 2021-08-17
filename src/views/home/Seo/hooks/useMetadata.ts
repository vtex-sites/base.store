import { useSession } from '@vtex/store-sdk'
import type { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { ComponentPropsWithoutRef } from 'react'

import type { Props } from '..'

type Options = Props

type Return = ComponentPropsWithoutRef<typeof GatsbySeo>

export const useMetadata = (props: Options): Return => {
  const { locale } = useSession()
  const {
    location: { pathname, host },
    data: { site },
  } = props

  const { siteMetadata } = site!
  const siteUrl = `https://${host}${pathname}`

  return {
    title: siteMetadata!.title!,
    description: siteMetadata!.description!,
    titleTemplate: siteMetadata!.titleTemplate!,
    language: locale,
    canonical: siteUrl,
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: siteMetadata!.title!,
      description: siteMetadata!.description!,
    },
  }
}
