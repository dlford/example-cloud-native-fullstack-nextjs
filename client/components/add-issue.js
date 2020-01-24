import React, { useState } from 'react'
import { Container, Button, Input, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { queries, mutations } from '../lib'

const AddIssue = () => {
  const [titleField, setTitleField] = useState('')
  const [descriptionField, setDescriptionField] = useState('')

  const [addIssue, { error, loading }] = useMutation(
    mutations.ADD_ISSUE,
    {
      variables: {
        title: titleField,
        description: descriptionField,
      },

      update: (cache, { data: { createIssue } }) => {
        const data = cache.readQuery({
          query: queries.ISSUE_LIST,
        })
        cache.writeQuery({
          query: queries.ISSUE_LIST,
          data: {
            ...data,
            issues: [...data.issues, createIssue],
          },
        })
      },
    },
  )

  const updateTitle = (event, { value }) => setTitleField(value)

  const updateDescription = (event, { value }) =>
    setDescriptionField(value)

  const handleSubmit = (event) => {
    event.preventDefault()
    addIssue().catch((error) => {
      console.log(`Failed to add issue: ${error.message || error}`)
    })
    setTitleField('')
    setDescriptionField('')
  }

  return (
    <Container textAlign='center'>
      <form onSubmit={handleSubmit}>
        <Input
          style={{ margin: '0.5rem' }}
          type='text'
          label='Title'
          value={titleField}
          onChange={updateTitle}
        />

        <Input
          style={{ margin: '0.5rem' }}
          type='text'
          label='Description'
          value={descriptionField}
          onChange={updateDescription}
        />

        <Button
          type='submit'
          disabled={loading || !titleField.length}
          loading={loading}
          style={{ margin: '0.5rem' }}
          primary
        >
          Add Issue
        </Button>
      </form>

      {!loading && !!error && (
        <Message error>{`Failed to add issue: ${error.message ||
          error}`}</Message>
      )}
    </Container>
  )
}

export default AddIssue
