/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  SessionProvider,
  UIProvider,
  CartProvider,
  CartValidator,
} from '@vtex/store-sdk'

import { validateCart } from './src/sdk/cart/validateCart'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import Layout from './src/views/Layout'

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

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
