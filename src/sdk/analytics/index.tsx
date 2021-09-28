import React, { useEffect } from 'react'
import { useAnalyticsEvent } from '@vtex/store-sdk'
import type { FC } from 'react'

export const AnalyticsProvider: FC = ({ children }) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
  }, [])

  useAnalyticsEvent((event) => {
    window.dataLayer.push(event)
  })

  return <> {children} </>
}

export default AnalyticsProvider
