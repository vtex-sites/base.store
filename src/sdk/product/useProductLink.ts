import { useMemo } from 'react'
import { useSession, sendAnalyticsEvent } from '@faststore/sdk'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type {
  CurrencyCode,
  ViewItemEvent as SDKViewItemEvent,
  SelectItemEvent as SDKSelectItemEvent,
  SelectItemData as SDKSelectItemData,
  Item as SDKItem,
  ViewItemData as SDKViewItemData,
} from '@faststore/sdk'

export type ProductLinkOptions = {
  index: number
  product: ProductSummary_ProductFragment
}

type Item = SDKItem & {
  product_reference_id?: string
}

type SelectItemEventData = SDKSelectItemData & { items: Item[] }

export interface SelectItemEvent extends SDKSelectItemEvent {
  data: SelectItemEventData
}

type ViewItemDataItem = SDKItem & {
  item_id: string
}

type ViewItemData = SDKViewItemData & {
  items: ViewItemDataItem[]
}

export interface ViewItemEvent extends SDKViewItemEvent {
  data: ViewItemData
}

export const useProductLink = ({ index, product }: ProductLinkOptions) => {
  const { slug } = product
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const onClick = () => {
      const currency = code as CurrencyCode

      sendAnalyticsEvent<SelectItemEvent>({
        type: 'select_item',
        data: {
          items: [
            {
              item_id: product.id,
              item_name: product.isVariantOf.name,
              item_variant_name: product.name,
              index,
              item_brand: product.brand.name,
              item_variant: product.sku,
              price: product.offers.offers[0].price,
            },
          ],
        },
      })

      sendAnalyticsEvent<ViewItemEvent>({
        type: 'view_item',
        data: {
          currency,
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
        },
      })
    }

    return {
      to: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [slug, code, product, index])
}
