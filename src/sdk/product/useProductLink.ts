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
  product: ViewItemData
}

export const useProductLink = ({ product, slug }: ProductLinkOptions) => {
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const onClick = () => {
      product.currency = code as CurrencyCode

      product.items = product.items?.map((p) => {
        return { ...p, currency: code } as Item
      })

      sendAnalyticsEvent<ViewItemEvent>({
        type: 'view_item',
        data: product,
      })
    }

    return {
      to: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [product, slug, code])
}
