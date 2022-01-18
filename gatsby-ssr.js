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

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}

export const onRenderBody = ({ setHeadComponents }) => {
  let addPartytown = false
  const forward = []

  if (storeConfig.analytics.gtmContainerId) {
    addPartytown = true
    setHeadComponents([
      <GoogleTagManager
        key="gtm"
        containerId={storeConfig.analytics.gtmContainerId}
        enablePartytown
      />,
    ])
  } else if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.warn('Check the analytics section on your store.config.js file.')
  }

  if (storeConfig.platform === 'vtex') {
    addPartytown = true
    forward.push('sendrc')
    setHeadComponents([
      <script
        key="rc.js-init"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
          window.sendrc=function(en,ed){window.NavigationCapture.sendEvent(en,ed)}
          `,
        }}
      />,
      <script
        key="rc.js-script"
        type="text/partytown"
        async
        src="https://io.vtex.com.br/rc/rc.js"
      />,
    ])
  }

  if (addPartytown) {
    setHeadComponents([<Partytown key="partytown" forward={forward} />])
  }
}
