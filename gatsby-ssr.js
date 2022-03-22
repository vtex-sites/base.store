/* eslint-disable react/jsx-filename-extension */
import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'

import ThirdPartyScripts from './src/components/ThirdPartyScripts'
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
  setHeadComponents([<ThirdPartyScripts key="ThirdPartyScripts" />])
}

/**
 * Gatsby inlines all styles from the app inside a `<style/>` tag. This decreases
 * FCP, but increases TBT. Since we are having trouble with TBT, replacing `<style/>`
 * with `<link/>` tags should lower TBT. This switch, however is not supported by
 * Gatsby.
 * A workaround described in https://github.com/gatsbyjs/gatsby/issues/1526 is
 * implemented below
 */
export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const transformedHeadComponents = getHeadComponents().map((node) => {
    if (node.type === 'style') {
      const globalStyleHref = node.props['data-href']

      if (globalStyleHref) {
        return (
          <link
            href={globalStyleHref}
            rel="stylesheet"
            type="text/css"
            media="screen"
          />
        )
      }

      return node
    }

    return node
  })

  replaceHeadComponents(transformedHeadComponents)
}
