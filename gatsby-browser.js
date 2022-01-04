import './src/styles/global.scss'

import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './store.config'

export const wrapRootElement = ({ element }) => {
  return (
    <ErrorBoundary>
      <AnalyticsHandler>
        <TestProvider>
          <UIProvider
            initialState={uiInitialState}
            actions={uiActions}
            effects={uiEffects}
          >
            <HelmetProvider>
              <SessionProvider initialState={{ channel: storeConfig.channel }}>
                <CartProvider mode="optimistic" onValidateCart={validateCart}>
                  {element}
                </CartProvider>
              </SessionProvider>
            </HelmetProvider>
          </UIProvider>
        </TestProvider>
      </AnalyticsHandler>
    </ErrorBoundary>
  )
}

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}
