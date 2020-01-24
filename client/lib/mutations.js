import gql from 'graphql-tag'

export const ADD_ISSUE = gql`
  mutation($title: String!, $description: String) {
    createIssue(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

export const REMOVE_ISSUE = gql`
  mutation($id: ID!) {
    removeIssue(id: $id)
  }
`

export const ADD_FEED = gql`
  mutation($issue: ID!, $message: String!) {
    createFeed(issue: $issue, message: $message) {
      id
      message
      timestamp
    }
  }
`
