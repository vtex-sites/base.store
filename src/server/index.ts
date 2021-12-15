// import {
//   envelop,
//   useExtendContext,
//   useMaskedErrors,
//   useSchema,
// } from '@envelop/core'
// import { useGraphQlJit } from '@envelop/graphql-jit'
// import { useParserCache } from '@envelop/parser-cache'
// import { useValidationCache } from '@envelop/validation-cache'
import {
  getContextFactory as storeApiGetContextFactory,
  getSchema as storeApiGetSchema,
} from '@faststore/api'
// import { GraphQLError, execute as run, parse } from 'graphql'
import { execute as run, parse } from 'graphql'
import type { ExecutionResult } from 'graphql'
// import type { FormatErrorHandler } from '@envelop/core'

import persisted from '../../@generated/graphql/persisted.json'
import { api, channel, platform } from '../../store.config'

const persistedQueries = new Map(Object.entries(persisted))

/* eslint-disable react-hooks/rules-of-hooks */
// TODO: Fix this as any
const apiOptions: any = {
  platform,
  account: api.storeId,
  environment: api.environment,
  channel,
}

const apiSchema = storeApiGetSchema(apiOptions)
const apiContextFactory = storeApiGetContextFactory(apiOptions)

// const isBadRequestError = (err: GraphQLError) => {
//   return err.originalError && err.originalError.name === 'BadRequestError'
// }

// const maskError: FormatErrorHandler = (err: GraphQLError | unknown) => {
//   if (err instanceof GraphQLError) {
//     if (!isBadRequestError(err)) {
//       return new GraphQLError('Sorry, something went wrong.')
//     }

//     return err
//   }

//   return new GraphQLError('Sorry, something went wrong.')
// }

// const getEnvelop = async (formatError: FormatErrorHandler) =>
//   envelop({
//     plugins: [
//       useSchema(await apiSchema),
//       useExtendContext(apiContextFactory),
//       useMaskedErrors({ formatError }),
//       useGraphQlJit(),
//       useValidationCache(),
//       useParserCache(),
//     ],
//   })

// const envelopPromise = getEnvelop(maskError)

export const execute = async <
  D extends Record<string, unknown>,
  V extends Record<string, unknown>
>(
  options: {
    operationName: string
    variables: V
    query?: string
  },
  envelopContext: Record<string, unknown> = {}
) => {
  const { operationName, variables, query: maybeQuery } = options
  const query = maybeQuery ?? persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  // const enveloped = await envelopPromise
  // const {
  //   parse,
  //   contextFactory,
  //   execute: run,
  //   schema,
  // } = enveloped(envelopContext)
  const schema = await apiSchema
  const contextFactory = apiContextFactory

  return run({
    schema,
    document: parse(query),
    variableValues: variables,
    contextValue: await contextFactory({}),
    operationName,
  }) as Promise<ExecutionResult<D>>
}
