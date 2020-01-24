import React, { useState } from 'react'
import { Container, Button, Input, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { queries, mutations } from '../lib'

const AddFeed = ({ id }) => {
  const [messageField, setMessageField] = useState('')

  const [addFeed, { error, loading }] = useMutation(
    mutations.ADD_FEED,
    {
      variables: {
        issue: id,
        message: messageField,
      },

      update: (cache, { data: { createFeed } }) => {
        const data = cache.readQuery({
          query: queries.ISSUE_DETAIL,
          variables: { id },
        })
        cache.writeQuery({
          query: queries.ISSUE_DETAIL,
          data: {
            ...data,
            issue: {
              ...data.issue,
              feed: [createFeed, ...data.issue.feed],
            },
          },
        })
      },
    },
  )

  const updateMessage = (event, { value }) => setMessageField(value)

  const handleSubmit = (event) => {
    event.preventDefault()
    addFeed().catch((error) => {
      console.log(`Failed to add feed: ${error.message || error}`)
    })
    setMessageField('')
  }

  return (
    <Container
      style={{
        marginBottom: '1rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Input
          style={{ margin: '0.5rem' }}
          type='text'
          label='Message'
          value={messageField}
          onChange={updateMessage}
        />

        <Button
          type='submit'
          disabled={loading || !messageField.length}
          loading={loading}
          style={{ margin: '0.5rem' }}
          primary
        >
          Add Entry
        </Button>
      </form>

      {!loading && !!error && (
        <Message error>{`Failed to add feed: ${error.message ||
          error}`}</Message>
      )}
    </Container>
  )
}

export default AddFeed
