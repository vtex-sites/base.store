import './src/styles/global.css'

import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'

import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import Layout from './src/views/Layout'
import config from './store.config'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <AnalyticsHandler>
      <TestProvider>
        <UIProvider
          initialState={uiInitialState}
          actions={uiActions}
          effects={uiEffects}
        >
          <SessionProvider initialState={{ channel: config.channel }}>
            <CartProvider mode="optimistic" onValidateCart={validateCart}>
              {element}
            </CartProvider>
          </SessionProvider>
        </UIProvider>
      </TestProvider>
    </AnalyticsHandler>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
