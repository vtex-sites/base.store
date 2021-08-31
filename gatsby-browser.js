import './src/styles/global.css'

import React from 'react'
import { SessionProvider, UIProvider, CartProvider } from '@vtex/store-sdk'

import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import Layout from './src/views/Layout'
import TestProvider from './src/sdk/tests'
import { validateCart } from './src/sdk/cart/validate'
import { uiInitialState, uiActions, uiEffects } from './src/sdk/ui'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <TestProvider>
      <UIProvider
        initialState={uiInitialState}
        actions={uiActions}
        effects={uiEffects}
      >
        <SessionProvider>
          <CartProvider mode="optimistic" onValidateCart={validateCart}>
            {element}
          </CartProvider>
        </SessionProvider>
      </UIProvider>
    </TestProvider>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
