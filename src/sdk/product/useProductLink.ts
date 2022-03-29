import { useCallback } from 'react'
import { sendAnalyticsEvent, useSession } from '@faststore/sdk'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import type { CurrencyCode, SelectItemEvent } from '@faststore/sdk'

import type { AnalyticsItem } from '../analytics/types'

export type ProductLinkOptions = {
  index: number
  product: ProductSummary_ProductFragment
  selectedOffer: number
}

export const useProductLink = ({
  index,
  product,
  selectedOffer,
}: ProductLinkOptions) => {
  const { slug } = product
  const {
    currency: { code },
  } = useSession()

  const onClick = useCallback(() => {
    sendAnalyticsEvent<SelectItemEvent<AnalyticsItem>>({
      name: 'select_item',
      params: {
        items: [
          {
            item_id: product.isVariantOf.productGroupID,
            item_name: product.isVariantOf.name,
            item_brand: product.brand.name,
            item_variant: product.sku,
            index,
            price: product.offers.offers[selectedOffer].price,
            discount:
              product.offers.offers[selectedOffer].listPrice -
              product.offers.offers[selectedOffer].price,
            currency: code as CurrencyCode,
            item_variant_name: product.name,
            product_reference_id: product.gtin,
          },
        ],
      },
    })
  }, [code, product, index, selectedOffer])

  return {
    to: `/${slug}/p`,
    onClick,
    'data-testid': 'product-link',
  }
}
