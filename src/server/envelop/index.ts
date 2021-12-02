/* eslint-disable react-hooks/rules-of-hooks */
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

export type FormatError = FormatErrorHandler

export const getEnveloped = async (formatError: FormatError) =>
  envelop({
    plugins: [
      useSchema(await getSchema()),
      useExtendContext(getContextFactory()),
      enableIf(isProduction, () => useMaskedErrors({ formatError })),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
      useResponseCache(),
    ],
  })
