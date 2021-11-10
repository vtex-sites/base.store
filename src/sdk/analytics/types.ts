import type {
  AddToCartEvent,
  AddToCartData,
  RemoveFromCartEvent,
  RemoveFromCartData,
  Item as AnalyticsItem,
} from '@faststore/sdk'
import type { CartItem } from 'src/sdk/cart/validate'

type AdditionalItemProperties = {
  product_reference_id: string | null
  sku_name: string | null
}

type AdditionalAnalyticsProperties = {
  name: string
  brand: string
  referenceId: string
  productId: string
}

export interface VTEXRemoveFromCartEvent extends RemoveFromCartEvent {
  data: RemoveFromCartData & {
    items: Array<AnalyticsItem & AdditionalItemProperties>
  }
}

export interface VTEXAddToCartEvent extends AddToCartEvent {
  data: AddToCartData & {
    items: Array<AnalyticsItem & AdditionalItemProperties>
  }
}

export type AnalyticsCartItem = CartItem & AdditionalAnalyticsProperties
