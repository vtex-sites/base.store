/* eslint-disable react-hooks/rules-of-hooks */
import type { GraphQLError } from 'graphql'
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import {
  envelop,
  useSchema,
  useErrorHandler,
  useMaskedErrors,
  useExtendContext,
} from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useValidationCache } from '@envelop/validation-cache'
import { useResponseCache } from '@envelop/response-cache'

import { getSchema, getContextFactory } from '../server'
import persisted from '../../@generated/graphql/persisted.json'

const persistedQueries = new Map(Object.entries(persisted))

const parseRequest = (req: GatsbyFunctionRequest) => {
  const { operationName, variables } =
    req.method === 'POST'
      ? req.body
      : {
          operationName: req.query.operationName,
          variables: JSON.parse(req.query.variables),
        }

  const query = persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  return {
    query,
    operationName,
    variables,
  }
}

const handleError = (error: readonly GraphQLError[]) => {
  // eslint-disable-next-line no-console
  console.log(error)
}

const createGetEnveloped = async () =>
  envelop({
    plugins: [
      useSchema(await getSchema()),
      useExtendContext(getContextFactory()),
      useErrorHandler((error) => handleError(error)),
      useMaskedErrors(),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
      useResponseCache(),
    ],
  })

const enveloped = createGetEnveloped()

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405)

    return
  }

  const getEnveloped = await enveloped
  const { parse, contextFactory, execute, schema } = getEnveloped({ req })
  const { operationName, variables, query } = parseRequest(req)

  const document = parse(query)
  const contextValue = await contextFactory()

  try {
    const response = await execute({
      schema,
      document,
      variableValues: variables,
      contextValue,
      operationName,
    })

    if (process.env.NODE_ENV !== 'production') {
      if (Array.isArray(response.errors)) {
        response.errors.forEach(console.error)
      }

      res.setHeader('cache-control', 'no-cache, no-store')
    }

    const isGraphQLError = (error: GraphQLError) => {
      return error.name === 'GraphQLError'
    }

    if (response.errors && isGraphQLError(response.errors[0])) {
      res.status(500)
    } else {
      response.errors && res.status(400)
    }

    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)

    res.status(500)
  }
}

export default handler
