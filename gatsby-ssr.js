/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { SessionProvider, UIProvider } from '@vtex/store-sdk'

export const wrapRootElement = ({ element }) => (
  <UIProvider>
    <SessionProvider>{element}</SessionProvider>
  </UIProvider>
)
