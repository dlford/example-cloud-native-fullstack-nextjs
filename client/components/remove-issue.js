import React from 'react'
import { Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { queries, mutations } from '../lib'

const RemoveIssue = ({
  removeIssueId,
  setRemoveIssueId,
  issueDetailId,
  setIssueDetailId,
}) => {
  const [removeIssue] = useMutation(mutations.REMOVE_ISSUE, {
    variables: {
      id: removeIssueId,
    },

    update: (cache, { data: { removeIssue } }) => {
      const data = cache.readQuery({
        query: queries.ISSUE_LIST,
      })
      cache.writeQuery({
        query: queries.ISSUE_LIST,
        data: {
          ...data,
          issues: data.issues.filter(({ id }) => {
            return id !== removeIssue
          }),
        },
      })
    },
  })

  const handleCancel = () => setRemoveIssueId(null)

  const handleConfirm = () => {
    if (removeIssueId === issueDetailId) setIssueDetailId(null)
    removeIssue().catch((error) => {
      console.log(`Failed to remove issue: ${error.message || error}`)
    })
    setRemoveIssueId(null)
  }

  return (
    <Confirm
      open={!!removeIssueId}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  )
}

export default RemoveIssue
