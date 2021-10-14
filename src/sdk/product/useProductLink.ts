import type {
  CurrencyCode,
  Item,
  ViewItemData,
  ViewItemEvent,
} from '@vtex/store-sdk'
import { useSession, sendAnalyticsEvent } from '@vtex/store-sdk'
import { useMemo } from 'react'

export type ProductLinkOptions = {
  slug: string
} & ViewItemData

export const useProductLink = ({ slug, ...product }: ProductLinkOptions) => {
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const onClick = () => {
      const currency = code as CurrencyCode
      const productItems = product.items?.map((p) => {
        return { ...p, currency } as Item
      })

      sendAnalyticsEvent<ViewItemEvent>({
        type: 'view_item',
        data: { ...product, currency, items: productItems },
      })
    }

    return {
      to: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [product, slug, code])
}
