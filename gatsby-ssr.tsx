import { CartProvider, SessionProvider, UIProvider } from '@faststore/sdk'
import type { ReactNode } from 'react'
import type { GatsbySSR } from 'gatsby'

import ThirdPartyScripts from './src/components/ThirdPartyScripts'
import Layout from './src/Layout'
import AnalyticsHandler from './src/sdk/analytics'
import { validateCart } from './src/sdk/cart/validate'
import ErrorBoundary from './src/sdk/error/ErrorBoundary'
import TestProvider from './src/sdk/tests'
import { uiActions, uiEffects, uiInitialState } from './src/sdk/ui'
import { ModalProvider } from './src/sdk/ui/modal'
import storeConfig from './store.config'

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
            <ModalProvider>{element}</ModalProvider>
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
  setHeadComponents([<ThirdPartyScripts key="ThirdPartyScripts" />])
}

// Gatsby types the returned elements from `getHeadComponents` as
// `React.ReactNode`, but this is inaccurate. The attributes defined below
// are present in those elements.
type StyleComponent = {
  type: 'style'
  props?: {
    'data-href'?: 'string'
    href: 'string'
  }
}

const isStyleComponent = (node: ReactNode): node is StyleComponent =>
  typeof node === 'object' && node != null && (node as any).type === 'style'

/**
 * Gatsby inlines all styles from the app inside a `<style/>` tag. This decreases
 * FCP, but increases TBT. Since we are having trouble with TBT, replacing `<style/>`
 * with `<link/>` tags should lower TBT. This switch, however is not supported by
 * Gatsby.
 * A workaround described in https://github.com/gatsbyjs/gatsby/issues/1526 is
 * implemented below
 *
 * We also need to ensure the global style as the first file to prevent break the style
 */
export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const transformedHeadComponents = getHeadComponents()
    .sort((node) => {
      if (isStyleComponent(node)) {
        const styleHref = node.props?.['data-href'] ?? node.props?.href ?? ''
        const isGlobalStyle = /^\/styles.[a-zA-Z0-9]*.css$/.test(styleHref) // global style regex

        return isGlobalStyle ? -1 : 1
      }

      return 1
    })
    .map((node) => {
      if (isStyleComponent(node)) {
        const styleHref = node.props?.['data-href'] ?? node.props?.href

        if (styleHref) {
          return (
            <link
              href={styleHref}
              rel="stylesheet"
              type="text/css"
              media="screen"
            />
          )
        }
      }

      return node
    })

  replaceHeadComponents(transformedHeadComponents)
}
