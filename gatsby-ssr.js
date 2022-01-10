/* eslint-disable react/jsx-filename-extension */
import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'
import { GoogleTagManager, Partytown } from '@builder.io/partytown/react'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './store.config'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <AnalyticsHandler>
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
    </AnalyticsHandler>
  </ErrorBoundary>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>

export const onRenderBody = ({ setHeadComponents }) => {
  if (storeConfig.analytics.gtmContainerId) {
    setHeadComponents([
      <GoogleTagManager
        key="gtm"
        containerId={storeConfig.analytics.gtmContainerId}
        enablePartytown
      />,
      <Partytown key="party" />,
    ])
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.warn('Check the analytics section on your store.config.js file.')
  }
}
