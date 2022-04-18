import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { execute } from '../server'

const parseRequest = (req: GatsbyFunctionRequest) => {
  const { operationName, variables, query } =
    req.method === 'POST'
      ? req.body
      : {
          operationName: req.query.operationName,
          variables: JSON.parse(req.query.variables),
          query: undefined,
        }

  return {
    operationName,
    variables,
    // Do not allow queries in production, only for devMode so we can use graphql tools
    // like introspection etc. In production, we only accept known queries for better
    // security
    query: process.env.NODE_ENV !== 'production' ? query : undefined,
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

  const { operationName, variables, query } = parseRequest(req)

  try {
    const response = await execute(
      {
        operationName,
        variables,
        query,
      },
      { req }
    )

    if (Array.isArray(response.errors)) {
      // TODO: Return 400 on userError
      res.status(500)
    }

    res.setHeader('cache-control', 'no-cache, no-store')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)

    res.status(500)
  }
}

export default handler
