import { useLocation } from '@reach/router'
import type { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { ComponentPropsWithoutRef } from 'react'
import { useLocale } from '@vtex/gatsby-theme-store'

import type { Props } from '../../../pages'

type Options = Props

type Return = ComponentPropsWithoutRef<typeof GatsbySeo>

export const useMetadata = (props: Options): Return => {
  const language = useLocale()
  const { pathname, host } = useLocation()
  const siteUrl = `https://${host}${pathname}`
  const {
    cmsSeo: {
      seo: { facebook, siteMetadata },
    },
  } = props.data

  return {
    ...siteMetadata,
    language,
    canonical: siteUrl,
    openGraph: {
      type: 'website',
      url: siteUrl,
      ...facebook,
    },
  }
}
