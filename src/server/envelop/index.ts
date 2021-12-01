/* eslint-disable react-hooks/rules-of-hooks */

import { GraphQLError } from 'graphql'
import type { FormatErrorHandler } from '@envelop/core'
import {
  enableIf,
  envelop,
  useExtendContext,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useResponseCache } from '@envelop/response-cache'
import { useValidationCache } from '@envelop/validation-cache'

import { getSchema, getContextFactory } from '..'

const { NODE_ENV, CONTEXT: ENV = NODE_ENV } = process.env
const isProduction = ENV === 'production'

export const isBadRequestError = (err: GraphQLError) => {
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

export const enveloped = async () =>
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
