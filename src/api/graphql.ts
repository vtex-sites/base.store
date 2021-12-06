import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { GraphQLError } from 'graphql'

import type { FormatError } from '../server/envelop'
import { getEnvelop } from '../server/envelop'
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

const isBadRequestError = (err: GraphQLError) => {
  return err.originalError && err.originalError.name === 'BadRequestError'
}

const maskError: FormatError = (err: GraphQLError | unknown) => {
  if (err instanceof GraphQLError) {
    if (!isBadRequestError(err)) {
      return new GraphQLError('Sorry, something went wrong.')
    }

    return err
  }

  return new GraphQLError('Sorry, something went wrong.')
}

const envelop = getEnvelop(maskError)

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405)

    return
  }

  const { parse, contextFactory, execute, schema } = (await envelop)({ req })
  const { operationName, variables, query } = parseRequest(req)

  try {
    const response = await execute({
      schema,
      document: parse(query),
      variableValues: variables,
      contextValue: await contextFactory(),
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
