/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { SessionProvider, UIProvider, CartProvider } from '@faststore/sdk'

import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import Layout from './src/views/Layout'
import TestProvider from './src/sdk/tests'
import { validateCart } from './src/sdk/cart/validate'
import AnalyticsHandler from './src/sdk/analytics'
import { uiInitialState, uiActions, uiEffects } from './src/sdk/ui'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <AnalyticsHandler>
      <TestProvider>
        <UIProvider
          initialState={uiInitialState}
          actions={uiActions}
          effects={uiEffects}
        >
          <SessionProvider
            initialState={{ channel: process.env.GATSBY_VTEX_CHANNEL }}
          >
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
  if (process.env.GATSBY_COMMERCE_PLATFORM === 'vtex') {
    setHeadComponents([
      <script key="rc.js-define">
        {
          'window.vtexrca=window.vtexrca||function(){(window.vtexrca.q=window.vtexrca.q||[]).push(arguments)};window.vtexrca.q=window.vtexrca.q||[];vtexrca.l=+new Date;'
        }
      </script>,
      <script key="rc.js-script" async src="https://io.vtex.com.br/rc/rc.js" />,
    ])
  }
}
