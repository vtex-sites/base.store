import RecSys from '@biggy/recsys'
import { SessionCartAddEvent } from '@biggy/recsys/event/types/session/cart-add'
import { SessionCartRemoveEvent } from '@biggy/recsys/event/types/session/cart-remove'
// import { PageCartEvent } from '@biggy/recsys/event/types/page/cart'
// import { DataLayerPageCategoryEvent } from '@biggy/recsys/event/types/datalayer/datalayer-page-category'
// import { DataLayerPageCategoryClickEvent } from '@biggy/recsys/event/types/datalayer/datalayer-page-category-click'
// import { PageConfirmationEvent } from '@biggy/recsys/event/types/page/confirmation'
// import { DataLayerSearchQueryEvent } from '@biggy/recsys/event/types/datalayer/datalayer-search-query'
// import { DataLayerSearchClickEvent } from '@biggy/recsys/event/types/datalayer/datalayer-search-click'
import { DataLayerProductViewEvent } from '@biggy/recsys/event/types/datalayer/datalayer-product-view'
import type { ViewItemEvent } from 'src/sdk/product/useProductLink'

import type { AnalyticsEvent } from '../..'
import type { VTEXAddToCartEvent, VTEXRemoveFromCartEvent } from '../../types'

const storeId = process.env.GATSBY_STORE_ID
const channel = process.env.GATSBY_VTEX_CHANNEL
// TODO: add the right host
const allowedHosts = ['localhost:8000']

if (
  typeof window !== undefined &&
  allowedHosts.includes(window.location.host) &&
  storeId
) {
  RecSys.init({
    environment: 'production',
    store: { slug: storeId },
  })
}

// TODO: Events
// Search Query; Category View; Product View; Product Click; Category Click;  Cart View;

const productView = (event: ViewItemEvent) => {
  return new DataLayerProductViewEvent({
    productId: event.data.items?.[0].item_id,

    // TODO: Get the session value from the indexeddb
    channel,
  }).push()
}

const addToCart = (event: VTEXAddToCartEvent) => {
  const locale = '' // TODO
  const [item] = event.data.items

  return new SessionCartAddEvent(channel, locale)
    .withProducts([
      {
        skuId: item.item_variant,
        product: item.sku_name,
        quantity: item.quantity,
      },
    ])
    .push()
}

const removeFromCart = (event: VTEXRemoveFromCartEvent) => {
  const locale = ''
  const [item] = event.data.items

  return new SessionCartRemoveEvent(channel, locale)
    .withProducts([
      {
        skuId: item.item_variant,
        quantity: item.quantity,
        product: item.sku_name,
      },
    ])
    .push()
}

export const sendISEvent = (event: AnalyticsEvent) => {
  switch (event.type) {
    case 'view_item':
      productView(event)
      break

    case 'add_to_cart':
      addToCart(event)
      break

    case 'remove_from_cart':
      removeFromCart(event)
      break

    default:
      break
  }
}
