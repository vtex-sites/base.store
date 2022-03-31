import './src/styles/fonts.css'
import './src/styles/global/tokens.scss'
import './src/styles/global/resets.scss'
import './src/styles/global/typography.scss'
import './src/styles/global/layout.scss'
import './src/styles/global/components.scss'

import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import type { GatsbyBrowser } from 'gatsby'

import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import storeConfig from './store.config'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => (
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

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  return <Layout>{element}</Layout>
}
