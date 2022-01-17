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

export const wrapRootElement = ({ element, pathname }) => {
  // Temporary added condition for pattern library page
  /* FIXME Remove this after removing pattern library page */
  if (pathname.includes('theming-poc')) {
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
  if (props.location.pathname.includes('theming-poc')) {
    return <>{element}</>
  }

  return <Layout>{element}</Layout>
}

export const onRenderBody = ({ setHeadComponents }) => {
  if (storeConfig.analytics.gtmContainerId) {
    setHeadComponents([
      <GoogleTagManager
        key="gtm"
        containerId={storeConfig.analytics.gtmContainerId}
        enablePartytown
      />,
      <Partytown key="party" />,
      <link
        key="preconnect"
        rel="preconnect"
        crossOrigin
        href="https://googletagmanager.com"
      />,
    ])
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.warn('Check the analytics section on your store.config.js file.')
  }
}
