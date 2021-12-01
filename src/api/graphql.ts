/* eslint-disable react-hooks/rules-of-hooks */
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import type { FormatErrorHandler } from '@envelop/core'
import {
  enableIf,
  envelop,
  useSchema,
  useMaskedErrors,
  useExtendContext,
} from '@envelop/core'
import { GraphQLError } from 'graphql'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useValidationCache } from '@envelop/validation-cache'
import { useResponseCache } from '@envelop/response-cache'

import { getSchema, getContextFactory } from '../server'
import persisted from '../../@generated/graphql/persisted.json'

const { NODE_ENV, CONTEXT: ENV = NODE_ENV } = process.env
const isProduction = ENV === 'production'

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

const isBadRequestError = (err: GraphQLError) => {
  return err.originalError && err.originalError.name === 'BadRequestError'
}

const maskError: FormatErrorHandler = (err: GraphQLError | unknown) => {
  if (err instanceof GraphQLError) {
    if (!isBadRequestError(err)) {
      return new GraphQLError('Sorry, something went wrong.')
    }

    return err
  }

  return new GraphQLError('Sorry, something went wrong.')
}

const createGetEnveloped = async () =>
  envelop({
    plugins: [
      useSchema(await getSchema()),
      useExtendContext(getContextFactory()),
      enableIf(isProduction, () => useMaskedErrors({ formatError: maskError })),
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

    if (response.errors && isBadRequestError(response.errors[0])) {
      res.status(400)
    } else {
      response.errors && res.status(500)
    }

    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)

    res.status(500)
  }
}

export default handler
