import './src/styles/global.scss'

import '@fontsource/orelega-one'

import '@fontsource/roboto-mono'
import '@fontsource/roboto-mono/700.css'

import '@fontsource/roboto'
import '@fontsource/roboto/700.css'

import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './store.config'

export const wrapRootElement = ({ element }) => {
  // Temporary added condition for pattern library page
  /* FIXME Remove this after removing pattern library page */
  if (window.location.pathname.includes('theming-poc')) {
    return (
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
    )
  }

  return (
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
}

export const wrapPageElement = ({ element, props }) => {
  // Temporary added condition for pattern library page
  /* FIXME Remove this after removing pattern library page */
  if (props.location.pathname.includes('theming-poc')) return <>{element}</>

  return <Layout>{element}</Layout>
}
