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
  setHeadComponents([
    <script
      key="font-load"
      dangerouslySetInnerHTML={{
        __html: `const fontR = new FontFace("Lato","url(/fonts/lato-v20-latin-regular-subset.woff2)",{style:'normal',weight: '400'});fontR.load().then(() => {document.fonts.add(fontR);document.body.classList.add("body-font")});const font7 = new FontFace("Lato","url(/fonts/lato-v20-latin-700-subset.woff2)",{style:'normal',weight: '700'});font7.load().then(() => {document.fonts.add(font7);});const font9 = new FontFace("Lato","url(/fonts/lato-v20-latin-900-subset.woff2)",{style:'normal',weight: '900'});font9.load().then(() => {document.fonts.add(font9);});`,
      }}
    />,
    <ThirdPartyScripts key="ThirdPartyScripts" />,
  ])
}

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents()

  // enforce the global style before the others
  const orderedComponents = headComponents.sort((item) => {
    const isGlobalStyle =
      item.type === 'style' &&
      item.props['data-href'] &&
      /^\/styles.[a-zA-Z0-9]*.css$/.test(item.props['data-href'])

    return isGlobalStyle ? -1 : 1
  })

  replaceHeadComponents(orderedComponents)
}
