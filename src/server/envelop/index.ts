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

import { getSchema, getContextFactory } from '..'

export type FormatError = FormatErrorHandler

export const getEnvelop = async (formatError: FormatError) =>
  envelop({
    plugins: [
      useSchema(await getSchema()),
      useExtendContext(getContextFactory()),
      useMaskedErrors({ formatError }),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
    ],
  })
