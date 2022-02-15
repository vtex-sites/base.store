/* eslint-disable react-hooks/rules-of-hooks */
import type { FormatErrorHandler } from '@envelop/core'
import {
  envelop,
  useExtendContext,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useValidationCache } from '@envelop/validation-cache'
import { getContextFactory, getSchema } from '@faststore/api'
import type { Options as APIOptions } from '@faststore/api'
import { GraphQLError } from 'graphql'

import storeConfig from '../store.config'
import persisted from '../../@generated/graphql/persisted.json'

interface ExecuteOptions {
  operationName: string
  variables: Record<string, unknown>
  query: string | null
}

const persistedQueries = new Map(Object.entries(persisted))

const apiOptions: APIOptions = {
  platform: storeConfig.platform as APIOptions['platform'],
  account: storeConfig.api.storeId,
  environment: storeConfig.api.environment as APIOptions['environment'],
  channel: storeConfig.channel,
}

const apiSchema = getSchema(apiOptions)
const apiContextFactory = getContextFactory(apiOptions)

const isBadRequestError = (err: GraphQLError) => {
  return err.originalError && err.originalError.name === 'BadRequestError'
}

const formatError: FormatErrorHandler = (err) => {
  console.error(err)

  if (err instanceof GraphQLError && isBadRequestError(err)) {
    return err
  }

  return new GraphQLError('Sorry, something went wrong.')
}

const getEnvelop = async () =>
  envelop({
    plugins: [
      useSchema(await apiSchema),
      useExtendContext(apiContextFactory),
      useMaskedErrors({ formatError }),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
    ],
  })

const envelopPromise = getEnvelop()

export const getApiSchema = () => apiSchema
export const getApiContextFactory = () => apiContextFactory

export const execute = async (options: ExecuteOptions, envelopContext = {}) => {
  const { operationName, variables, query: maybeQuery } = options
  const query = maybeQuery ?? persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  const enveloped = await envelopPromise
  const {
    parse,
    contextFactory,
    execute: run,
    schema,
  } = enveloped(envelopContext)

  return run({
    schema,
    document: parse(query),
    variableValues: variables,
    contextValue: await contextFactory({}),
    operationName,
  })
}
