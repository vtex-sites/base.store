import fetch from 'isomorphic-unfetch'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { getItemId } from '../sdk/cart/useCart'
import type { Cart, CartItem, CartMessages } from '../sdk/cart/useCart'

const store = process.env.GATSBY_STORE_ID
const environment = process.env.GATSBY_VTEX_ENVIRONMENT

const base = `https://${store}.${environment}.com.br`
const api = {
  updateItems: (id: string) =>
    `${base}/api/checkout/pub/orderForm/${id}/items?allowOutdatedData=paymentData`,
  getItems: (id: string) =>
    `${base}/api/checkout/pub/orderForm/${id}?refreshOutdatedData=false`,
}

interface OrderForm {
  orderFormId: string
  items: Array<{
    id: string
    listPrice: number
    quantity: number
    isGift: boolean
    price: number
    seller: string
    imageUrl: string
    name: string
  }>
  messages: CartMessages[]
}

const fetchAPI = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, {
    method: 'POST',
    ...init,
    credentials: 'omit',
    headers: {
      ...init?.headers,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json()
    }

    throw new Error(await res.text())
  })

const orderFormToCart = (orderForm: OrderForm) => {
  const { orderFormId: cartId, items: orderItems, messages } = orderForm

  const items = orderItems.reduce((acc, curr, index) => {
    const { id: skuId, quantity, isGift, price, listPrice, seller } = curr
    const id = getItemId({
      seller,
      skuId,
    })

    const item: Omit<CartItem, 'image' | 'name'> = {
      id,
      seller,
      skuId,
      price: price / 100,
      listPrice: listPrice / 100,
      quantity: isGift ? acc[id]?.quantity ?? 0 : quantity,
      giftQuantity: isGift ? quantity : acc[id]?.giftQuantity ?? 0,
    }

    acc[id] = {
      ...item,
      index,
    }

    return acc
  }, {} as Record<string, Omit<CartItem, 'image' | 'name'> & { index: number }>)

  return {
    items,
    id: cartId,
    messages,
  }
}

const getItemsById = (cart: Cart) =>
  cart.items.reduce((acc, curr) => {
    acc[curr.id] = curr

    return acc
  }, {} as Record<string, CartItem>)

const reconcile = (of: ReturnType<typeof orderFormToCart>, cart: Cart) => {
  const itemsById = getItemsById(cart)

  return {
    ...of,
    items: Object.values(of.items).map((item) => ({
      ...item,
      image: itemsById[item.id].image,
      name: itemsById[item.id].name,
    })),
  }
}

type OrderFormCart = ReturnType<typeof orderFormToCart>

const getOrderForm = (id: string) =>
  fetchAPI(api.getItems(id)).then(orderFormToCart)

const updateItems = (
  id: string,
  items: Array<{
    id: string
    quantity: number
    seller: string
    index?: number
  }>
) =>
  fetchAPI(api.updateItems(id), {
    method: 'PATCH',
    body: JSON.stringify({
      orderItems: items,
    }),
  }).then(orderFormToCart)

const deltaChanges = (cart: Cart, orderForm: OrderFormCart) => {
  const cartObj = getItemsById(cart)

  const itemsToAdd = cart.items
    .filter((item) => !orderForm.items[item.id])
    .map((item) => ({
      id: item.skuId,
      seller: item.seller,
      quantity: item.quantity,
    }))

  const itemsToUpdate = cart.items
    .filter(
      (item) =>
        orderForm.items[item.id] &&
        (item.quantity !== orderForm.items[item.id].quantity ||
          item.giftQuantity !== orderForm.items[item.id].giftQuantity)
    )
    .map((item) => ({
      id: item.skuId,
      seller: item.seller,
      quantity: item.quantity,
      index: orderForm.items[item.id].index,
    }))

  const itemsToDelete = Object.values(orderForm.items)
    .filter((item) => !cartObj[item.id])
    .map((item) => ({
      id: item.skuId,
      quantity: 0,
      seller: item.seller,
      index: item.index,
    }))

  return [...itemsToAdd, ...itemsToUpdate, ...itemsToDelete]
}

const validateCart = async (cart: Cart): Promise<Cart | null> => {
  try {
    const orderForm = await getOrderForm(cart.id)
    const updates = deltaChanges(cart, orderForm)

    if (updates.length > 0) {
      const updatedOrderForm = await updateItems(orderForm.id, updates)

      const delta = deltaChanges(cart, updatedOrderForm)

      if (delta.length > 0 || updatedOrderForm.messages) {
        return reconcile(updatedOrderForm, cart)
      }
    }

    return null
  } catch (err) {
    console.error(err)

    return null
  }
}

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST') {
    res.status(405)

    return
  }

  const cart: Cart = req.body
  const validated = await validateCart(cart)

  res.setHeader('content-type', 'application/json')
  res.send(JSON.stringify(validated))
}

export default handler
