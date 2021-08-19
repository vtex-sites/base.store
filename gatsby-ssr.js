/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  SessionProvider,
  UIProvider,
  CartProvider,
  CartValidator,
} from '@vtex/store-sdk'

import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import { validateCart } from './src/sdk/cart/validateCart'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <UIProvider>
      <SessionProvider>
        <CartProvider>
          <CartValidator onValidateCart={validateCart}>{element}</CartValidator>
        </CartProvider>
      </SessionProvider>
    </UIProvider>
  </ErrorBoundary>
)
