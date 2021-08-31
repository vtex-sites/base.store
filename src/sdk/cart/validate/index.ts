import type { Cart } from '../useCart'

export const validateCart = (cart: Cart) =>
  import('./backend').then((asyncModule) => asyncModule.default(cart))
