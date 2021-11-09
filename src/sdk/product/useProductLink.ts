import { useMemo } from 'react'
import { useSession, sendAnalyticsEvent } from '@faststore/sdk'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type {
  CurrencyCode,
  ViewItemData,
  ViewItemEvent,
  SelectItemEvent,
  SelectItemData,
  Item,
} from '@faststore/sdk'

export type ProductLinkOptions = {
  index: number
  product: ProductSummary_ProductFragment
}

type GAItem = Item & {
  product_reference_id?: string
}

type GASelectItemEventData = SelectItemData & { items: GAItem[] }

interface GASelectItemEvent extends SelectItemEvent {
  data: GASelectItemEventData
}

export const useProductLink = ({ index, product }: ProductLinkOptions) => {
  const { slug } = product
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const SelectItemEventData: GASelectItemEventData = {
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
