import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import { execute } from '../server'

const parseRequest = (req: GatsbyFunctionRequest) => {
  const { operationName, variables } =
    req.method === 'POST'
      ? req.body
      : {
          operationName: req.query.operationName,
          variables: JSON.parse(req.query.variables),
        }

  return {
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

  try {
    const { operationName, variables } = parseRequest(req)

    const response = await execute({
      variableValues: variables,
      operationName,
    })

    if (Array.isArray(response.errors)) {
      response.errors.forEach(console.error)
    }

    res.setHeader('cache-control', 'no-cache, no-store')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(response))
  } catch (err) {
    console.error(err)

    res.setHeader('cache-control', 'no-cache, no-store')
    res.status(500)
  }
}

export default handler
