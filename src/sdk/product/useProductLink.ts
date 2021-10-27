import { useMemo } from 'react'
import { useSession, sendAnalyticsEvent } from '@vtex/store-sdk'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type {
  CurrencyCode,
  ViewItemData,
  ViewItemEvent,
  SelectItemEvent,
  SelectItemData,
  Item,
} from '@vtex/store-sdk'

export type ProductLinkOptions = {
  slug: string
  index: number
} & ProductSummary_ProductFragment

type LocalItem = Item & {
  product_reference_id?: string
}

type GASelectItemEventData = SelectItemData & { items: LocalItem[] }

interface GASelectItemEvent extends SelectItemEvent {
  data: GASelectItemEventData
}

export const useProductLink = ({
  slug,
  index,
  ...product
}: ProductLinkOptions) => {
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const SelectItemEventData: GASelectItemEventData = {
      items: [
        {
          item_id: product.id,
          product_reference_id: product.gtin,
          // sku_reference_id: product.sku,
          item_name: product.name,
          // sku_name: 'sku name', // not sure about where to get that
          index,
          item_brand: product.brand.name,
          // item_category: item_category,
          // item_variant: item_variant,
          price: product.offers.offers[0].price,
        },
      ],
    }

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

      sendAnalyticsEvent<GASelectItemEvent>({
        type: 'select_item',
        data: { ...SelectItemEventData },
      })

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
  }, [slug, code, product, index])
}
