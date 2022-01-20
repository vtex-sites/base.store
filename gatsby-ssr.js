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

/* this is a hack to fix `gatsby-plugin-sass` from including the
  css in every single file (which is > 120k lines).
  see: https://github.com/gatsbyjs/gatsby/issues/1526
  `ssr` means server-side rendering.
  */
export const onPreRenderHTML = ({ getHeadComponents }) => {
  // if (process.env.NODE_ENV !== 'production') {
  //   // ONLY run in production
  //   return
  // }

  getHeadComponents().forEach((el) => {
    // Remove inline css. https://github.com/gatsbyjs/gatsby/issues/1526
    // eslint-disable-next-line vtex/prefer-early-return
    if (el.type === 'style' && el.props['data-href']) {
      el.type = 'link'
      el.props.href = el.props['data-href']
      el.props.rel = 'stylesheet'
      el.props.type = 'text/css'

      delete el.props['data-href']
      delete el.props.dangerouslySetInnerHTML
      delete el.props.children
    }
  })
}
