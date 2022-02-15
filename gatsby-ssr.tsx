import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import React from 'react'
import type { GatsbySSR, PreRenderHTMLArgs } from 'gatsby'

import ThirdPartyScripts from './src/components/ThirdPartyScripts'
import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './src/store.config'

// Gatsby types the returned elements from `getHeadComponents` as
// `React.ReactNode`, but this is inaccurate. The attributes defined below
// are present in those elements.
interface HeadComponents
  extends ReturnType<PreRenderHTMLArgs['getHeadComponents']> {
  type: string
  key: string
  props?: Record<string, unknown>
}

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => (
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

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return <Layout>{element}</Layout>
}

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([<ThirdPartyScripts key="third-party-scripts-component" />])
}

export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents() as HeadComponents[]

  // enforce the global style before the others
  const orderedComponents = headComponents.sort((item) => {
    const isGlobalStyle =
      item?.key === 'style' &&
      item?.props?.['data-href'] &&
      /^\/styles.[a-zA-Z0-9]*.css$/.test(item.props['data-href'] as string)

    return isGlobalStyle ? -1 : 1
  })

  replaceHeadComponents(orderedComponents)
}
