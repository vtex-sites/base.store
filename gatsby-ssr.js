/* eslint-disable react/jsx-filename-extension */
import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'

import ThirdyPartyScripts from './src/components/ThirdyPartyScripts'
import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './store.config'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <AnalyticsHandler />
    <TestProvider>
      <UIProvider
        initialState={uiInitialState}
        actions={uiActions}
        effects={uiEffects}
      >
        <SessionProvider initialState={{ channel: storeConfig.channel }}>
          <CartProvider mode="optimistic" onValidateCart={validateCart}>
            {element}
          </CartProvider>
        </SessionProvider>
      </UIProvider>
    </TestProvider>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(<ThirdyPartyScripts key="ThirdyPartyScripts" />)
}
