import { gql } from 'apollo-server-express'

import healthcheckSchema from './healthcheck'
import issueSchema from './issue'
import feedSchema from './feed'

const baseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

export default [
  baseSchema,
  healthcheckSchema,
  issueSchema,
  feedSchema,
]
