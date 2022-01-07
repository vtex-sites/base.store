import fetch from 'node-fetch'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import storeConfig from '../../store.config'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { environment, storeId } = storeConfig.api

  const headers = {
    Accept: 'application/json',
  }

  const { country, postalCode } = req.query

  const result = await fetch(
    `https://${storeId}.${environment}.com.br/api/checkout/pub/regions?country=${country}&postalCode=${postalCode}&sc=2`,
    { method: 'GET', headers }
  )

  const data = await result.json()

  res.json(JSON.stringify(data))
}
