import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, ViewItemData, ViewItemEvent } from '@vtex/store-sdk'
import { useSession, sendAnalyticsEvent } from '@vtex/store-sdk'
import { useMemo } from 'react'

export type ProductLinkOptions = {
  slug: string
} & ProductSummary_ProductFragment

export const useProductLink = ({ slug, ...product }: ProductLinkOptions) => {
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const viewItemEventData: ViewItemData = {
      value: product.offers.offers[0]?.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          index: 0,
          price: product.offers.offers[0]?.price,
          discount:
            product.offers.offers[0]?.listPrice -
            product.offers.offers[0]?.price,
          item_brand: product.brand.name,
          item_variant: product.isVariantOf.name,
        },
      ],
    }

    const onClick = () => {
      const currency = code as CurrencyCode

      sendAnalyticsEvent<ViewItemEvent>({
        type: 'view_item',
        data: { ...viewItemEventData, currency },
      })
    }

    return {
      to: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [slug, code, product])
}
