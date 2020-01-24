import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import models, { connectDb } from './models'
import resolvers from './resolvers'
import schema from './schema'

const app = express()

app.use(morgan('dev'))

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  context: { models },
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const port = process.env.PORT || 3000

connectDb().then(async () => {
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
})
