import React from 'react'
import { SessionProvider, UIProvider } from '@vtex/store-sdk'

import ErrorBoundary from './src/components/error/ErrorBoundary'

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <UIProvider>
      <SessionProvider>{element}</SessionProvider>
    </UIProvider>
  </ErrorBoundary>
)
