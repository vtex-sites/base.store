import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { enveloped, isBadRequestError } from '../server/envelop'
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

const handler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405)

    return
  }

  const getEnveloped = await enveloped()
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
