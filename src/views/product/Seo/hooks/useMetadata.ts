import { useSession } from '@vtex/store-sdk'
import { useMemo } from 'react'
import { useLocation } from '@reach/router'

import type { Props } from '..'

export const useMetadata = (options: Props) => {
  const { locale, currency } = useSession()
  const { pathname: path, host } = useLocation()

  return useMemo(() => {
    const { product, site } = options
    const siteMetadata = site.siteMetadata!
    const price =
      product?.items?.[0]?.sellers?.[0]?.commercialOffer?.spotPrice?.toString()

    const title = product?.titleTag ?? siteMetadata.title!
    const description = product?.metaTagDescription ?? siteMetadata.description!
    const pathname = path[path.length - 1] === '/' ? path.slice(0, -1) : path // remove trailing slashes from pathname
    const canonical =
      host !== undefined ? `https://${host}${pathname}` : pathname

    const images = product?.items?.[0]?.images?.map((image) => ({
      url: image!.imageUrl!,
      alt: image!.imageText!,
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
          content: price ?? undefined,
        },
        {
          property: 'product:price:currency',
          content: currency.code,
        },
      ],
    }
  }, [currency.code, host, locale, options, path])
}
