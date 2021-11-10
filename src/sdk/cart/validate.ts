import { gql } from '@vtex/graphql-utils'
import type { CartItem as ICartItem } from '@faststore/sdk'
import type { IStoreProduct, IStoreOffer } from '@faststore/api'
import type {
  ValidateCartMutationMutation,
  ValidateCartMutationMutationVariables,
} from '@generated/graphql'

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

export interface Cart<Item> {
  id: string
  items: Item[]
  messages?: CartMessages[]
}

export const isGift = (item: CartItem) => item.price === 0

export const getItemId = (
  item: Pick<CartItem, 'itemOffered' | 'seller' | 'price'>
) => `${item.itemOffered.sku}:${item.seller.identifier}:${item.price}`

export const validateCart = async <Item extends CartItem>(cart: Cart<Item>) => {
  const { validateCart: validated } = await request<
    ValidateCartMutationMutation,
    ValidateCartMutationMutationVariables
  >(ValidateCartMutation, {
    cart: {
      order: {
        orderNumber: cart.id,
        acceptedOffer: cart.items.map(
          ({
            price,
            listPrice,
            seller,
            quantity,
            itemOffered,
          }): IStoreOffer => ({
            price,
            listPrice,
            seller,
            quantity,
            itemOffered,
          })
        ),
      },
    },
  })

  const mappedItems = cart.items.reduce((acc, item) => {
    acc[item.id] = item

    return acc
  }, {} as Record<string, Item>)

  return (
    validated && {
      id: validated.order.orderNumber,
      items: validated.order.acceptedOffer.map((item): Item => {
        const id = getItemId(item)

        return {
          ...(mappedItems[id] ?? {}),
          ...item,
          id,
        }
      }),
      messages: validated.messages,
    }
  )
}

export const ValidateCartMutation = gql`
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
