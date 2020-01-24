import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    issues: [Issue!]!
    issue(id: ID!): Issue!
  }

  extend type Mutation {
    createIssue(title: String!, description: String): Issue!
    removeIssue(id: ID!): ID!
  }

  type Issue {
    id: ID!
    title: String!
    description: String
    feed: [Feed!]
  }
`
