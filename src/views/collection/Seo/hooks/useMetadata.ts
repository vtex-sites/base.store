import { useLocation } from '@reach/router'
import { useMemo } from 'react'
import { useSearch, useSession } from '@faststore/sdk'
import type { GatsbySeo } from 'gatsby-plugin-next-seo'
import type { ComponentPropsWithoutRef } from 'react'

export interface Options {
  title?: string
  titleTemplate?: string
  description?: string
  canonical?: string
}

type GatsbySEOProps = ComponentPropsWithoutRef<typeof GatsbySeo>

export const useMetadata = ({
  title,
  titleTemplate,
  description,
  canonical,
}: Options): GatsbySEOProps => {
  const { locale } = useSession()
  const { host } = useLocation()
  const {
    state: { page },
  } = useSearch()

  // According to Google, one should use either noindex or canonical, never both.
  // Also, we generate relative canonicals in the HTML. These will be hydrated to absolute URLs via JS.
  const canonicalTags = useMemo(() => {
    // We still don't support canonalizing other pagination rather then the first one
    if (typeof canonical === 'string') {
      const query = page !== 0 ? `?page=${page}` : ''

      return {
        canonical:
          host !== undefined
            ? `https://${host}${canonical}${query}`
            : `${canonical}${query}`,
        noindex: false,
        nofollow: false,
      }
    }

    return { canonical: undefined, noindex: true, nofollow: false }
  }, [canonical, host, page])

  return {
    ...canonicalTags,
    language: locale,
    title,
    titleTemplate,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
    },
  }
}
