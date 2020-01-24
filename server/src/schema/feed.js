import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    createFeed(issue: ID!, message: String!): Feed!
  }

  type Feed {
    id: ID!
    message: String!
    # This should really use a Date scalar!
    timestamp: String!
  }
`
