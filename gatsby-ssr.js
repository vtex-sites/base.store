/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  SessionProvider,
  UIProvider,
  CartProvider,
  CartValidator,
} from '@vtex/store-sdk'

import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import Layout from './src/views/Layout'
import { validateCart } from './src/sdk/cart/validateCart'
import { uiInitialState, uiActions, uiEffects } from './src/sdk/ui'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <UIProvider
      initialState={uiInitialState}
      actions={uiActions}
      effects={uiEffects}
    >
      <SessionProvider>
        <CartProvider>
          <CartValidator onValidateCart={validateCart}>{element}</CartValidator>
        </CartProvider>
      </SessionProvider>
    </UIProvider>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
