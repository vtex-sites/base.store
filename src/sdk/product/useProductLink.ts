import { useMemo } from 'react'
import { useSession, sendAnalyticsEvent } from '@faststore/sdk'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type {
  CurrencyCode,
  SelectItemEvent,
  SelectItemParams,
  Item,
} from '@faststore/sdk'

export type ProductLinkOptions = {
  index: number
  product: ProductSummary_ProductFragment
}

type GAItem = Item & {
  product_reference_id?: string
}

type GASelectItemEventParams = SelectItemParams & { items: GAItem[] }

interface GASelectItemEvent extends SelectItemEvent {
  params: GASelectItemEventParams
}

export const useProductLink = ({ index, product }: ProductLinkOptions) => {
  const { slug } = product
  const {
    currency: { code },
  } = useSession()

  return useMemo(() => {
    const onClick = () => {
      const currency = code as CurrencyCode

      sendAnalyticsEvent<GASelectItemEvent>({
        name: 'select_item',
        params: {
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

      sendAnalyticsEvent({
        name: 'view_item',
        params: {
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
      href: `/${slug}/p`,
      onClick,
      'data-testid': 'product-link',
    }
  }, [slug, code, product, index])
}
