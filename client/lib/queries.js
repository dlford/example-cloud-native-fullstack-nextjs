import gql from 'graphql-tag'

export const ISSUE_LIST = gql`
  query {
    issues {
      id
      title
      description
    }
  }
`

export const ISSUE_DETAIL = gql`
  query($id: ID!) {
    issue(id: $id) {
      id
      title
      description
      feed {
        id
        message
        timestamp
      }
    }
  }
`
