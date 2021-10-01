import { ApolloServer } from 'apollo-server-express'

import { getContextFactory, resolvers, typeDefs } from '../server'

const contextFactory = getContextFactory()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextFactory({}),
})

// const handler = async () => {
//   const server = new ApolloServer({
//     schema: await getSchema(),
//     context: contextFactory({}),
//     introspection: true,
//     playground: true,
//   })

//   return server.createHandler()
// }

export default server.createHandler()
