/* eslint-disable react/jsx-filename-extension */
import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'
import { Partytown } from '@builder.io/partytown/react'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { googleTagManager } from './src/sdk/analytics/googleTagManager'
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
  let addPartytown = false
  const forward = []

  if (storeConfig.analytics.gtmContainerId) {
    addPartytown = true
    forward.push('dataLayer.push')

    // The first script adds the GTM script to partytown. It is meant for when regular users
    // are browsing the website, so that loading and executing it doesn't affect performance
    //
    // The second script is meant for GTM debugging. Since debugging GTM inside partytown still doesn't work,
    // it is only executed when the url includes the gtm_debug query string.
    //
    // Since the query string isn't accessible during SSR, the decision of which script should be executed
    // is bundled with the script, and that's why we need to include both. The script isn't GTM itself, but
    // the code who will, after being executed, add the GTM script to the page.
    setHeadComponents([
      <script
        key="gtm.partytown"
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: googleTagManager({
            containerId: storeConfig.analytics.gtmContainerId,
            partytownScript: true,
          }),
        }}
      />,
      <script
        key="gtm"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: googleTagManager({
            containerId: storeConfig.analytics.gtmContainerId,
            partytownScript: false,
          }),
        }}
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
          window.sendrc=function(en,ed){window.NavigationCapture&&window.NavigationCapture.sendEvent(en,ed)};
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
