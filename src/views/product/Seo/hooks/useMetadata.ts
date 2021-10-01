import { useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'
import { useLocation } from '@reach/router'

import type { Props } from '..'

type Options = Props & { title: string }

export const useMetadata = (options: Options) => {
  const { locale, currency } = useSession()
  const { pathname: path, host } = useLocation()

  return useMemo(() => {
    const { product, site, title } = options
    const siteMetadata = site.siteMetadata!
    const {
      seo,
      offers: { lowPrice },
    } = product

    const description = seo.description ?? siteMetadata.description!
    const pathname = path[path.length - 1] === '/' ? path.slice(0, -1) : path // remove trailing slashes from pathname
    const canonical =
      host !== undefined ? `https://${host}${pathname}` : pathname

    const images = product.image.map((x) => ({
      url: x.url,
      alt: x.alternateName,
    }))

    return {
      language: locale,
      title,
      description,
      canonical,
      openGraph: {
        type: 'og:product',
        url: `${siteMetadata.siteUrl}${pathname}`,
        title,
        description,
        images,
      },
      metaTags: [
        {
          property: 'product:price:amount',
          content: lowPrice?.toString() ?? undefined,
        },
        {
          property: 'product:price:currency',
          content: currency.code,
        },
      ],
    }
  }, [currency.code, host, locale, options, path])
}
