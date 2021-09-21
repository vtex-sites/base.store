import { ValidateCartMutation } from '@generated/ValidateCartMutation.graphql'
import { gql } from '@vtex/gatsby-plugin-graphql'
import type { CartItem as ICartItem } from '@vtex/store-sdk'
import type {
  ValidateCartMutationMutation,
  ValidateCartMutationMutationVariables,
} from '@generated/ValidateCartMutation.graphql'

import { request } from '../graphql/request'

export interface CartItem extends ICartItem {
  seller: {
    identifier: string
  }
  price: number
  listPrice: number
  itemOffered: IStoreProduct
}

export interface CartMessages {
  status: 'error'
  text: string
}

export interface Cart {
  id: string
  items: CartItem[]
  messages?: CartMessages[]
}

export const getItemId = (
  item: Pick<CartItem, 'itemOffered' | 'seller' | 'price'>
) => `${item.itemOffered.sku}:${item.seller.identifier}:${item.price}`

export const validateCart = async (cart: Cart) => {
  const { validateCart: validated } = await request<
    ValidateCartMutationMutation,
    ValidateCartMutationMutationVariables
  >({
    ...ValidateCartMutation,
    variables: {
      cart: {
        order: {
          orderNumber: cart.id,
          acceptedOffer: cart.items.map(({ id, ...item }) => item),
        },
      },
    },
  })

  return (
    validated && {
      id: validated.order.orderNumber,
      items: validated.order.acceptedOffer.map((item) => ({
        ...item,
        id: getItemId(item),
      })),
      messages: validated.messages,
    }
  )
}

export const mutation = gql`
  mutation ValidateCartMutation($cart: IStoreCart!) {
    validateCart(cart: $cart) {
      order {
        orderNumber
        acceptedOffer {
          seller {
            identifier
          }
          quantity
          price
          listPrice
          itemOffered {
            sku
            name
            image {
              url
              alternateName
            }
          }
        }
      }
      messages {
        text
        status
      }
    }
  }
`
