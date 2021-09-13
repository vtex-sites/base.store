/* eslint-disable react-hooks/rules-of-hooks */
import { envelop, useExtendContext, useSchema } from '@envelop/core'
import { useDisableIntrospection } from '@envelop/disable-introspection'
import { useGraphQlJit } from '@envelop/graphql-jit'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import persistedQueries from '../../__generated__/persisted.graphql.json'
import { getContextFactory, getSchema } from '../server'

const parseProdRequest = (req: GatsbyFunctionRequest) => {
  const res =
    req.method === 'POST'
      ? JSON.parse(req.body)
      : {
          operationName: req.query.operationName,
          extensions: JSON.parse(req.query.extensions),
          variables: JSON.parse(req.query.variables),
        }

  const hash = res.extensions.persistedQuery.sha256Hash
  const query = (persistedQueries as any)[hash]

  if (query == null) {
    throw new Error(`No query found with hash: ${hash}`)
  }

  return {
    query,
    operationName: res.operationName,
    variables: res.variables,
  }
}

const parseDevRequest = (req: GatsbyFunctionRequest) => {
  if (req.method === 'POST') {
    return JSON.parse(req.body)
  }

  throw new Error('No GET request during development is allowed')
}

const createGetEnveloped = async () =>
  envelop({
    plugins: [
      useSchema(await getSchema()),
      useExtendContext(getContextFactory()),
      useDisableIntrospection(),
      useGraphQlJit(),
    ],
  })

const getEnvelopedPromise = createGetEnveloped()

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405)

    return
  }

  const { operationName, variables, query } =
    process.env.NODE_ENV === 'production'
      ? parseProdRequest(req)
      : parseDevRequest(req)

  const getEnveloped = await getEnvelopedPromise
  const { parse, contextFactory, execute, schema } = getEnveloped({ req })

  try {
    const result = await execute({
      schema,
      document: parse(query),
      variableValues: variables,
      contextValue: await contextFactory(),
      operationName,
    })

    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  } catch (err) {
    console.error(err)

    res.status(500)
  }
}

export default handler
