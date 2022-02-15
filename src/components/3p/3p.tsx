import { Partytown } from '@builder.io/partytown/react'
import React from 'react'

import storeConfig from '../../../store.config'
import GoogleTagManager from './GoogleTagManager'
import VTEX from './vtex'

const isString = (obj: unknown): obj is string => typeof obj === 'string'

const gtmContainerId = storeConfig.analytics?.gtmContainerId

const includeGTM = typeof gtmContainerId === 'string'
const includeVTEX = storeConfig.platform === 'vtex'

function ThirdPartyScripts() {
  if (process.env.NODE_ENV === 'development' && !includeGTM) {
    console.warn(
      'No GTM container id found. Check the analytics section on your store.config.js file for enhanced observability of your store.'
    )
  }

  /**
   * Variables to forward to from main to worker
   */
  const forward = [
    includeGTM && 'dataLayer.push',
    includeVTEX && 'sendrc',
  ].filter(isString)

  return (
    <>
      <Partytown key="partytown" forward={forward} />
      {includeGTM && <GoogleTagManager containerId={gtmContainerId} />}
      {includeVTEX && <VTEX />}
    </>
  )
}

export default ThirdPartyScripts
