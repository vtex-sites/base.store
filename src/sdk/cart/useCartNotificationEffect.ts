import { useEffect } from 'react'

import { useUI } from '../ui'
import { useCart } from './useCart'

/**
 * Send cart notifications to toast in case the cart
 * returns warnings
 */
export const useCartNotificationEffect = () => {
  const { pushToast } = useUI()
  const { messages } = useCart()

  useEffect(() => {
    if (!messages) {
      return
    }

    messages.forEach((message) =>
      pushToast({
        message: message.text,
        status: message.status,
      })
    )
  }, [messages, pushToast])
}
