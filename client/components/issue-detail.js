import React from 'react'
import {
  Container,
  Header,
  Loader,
  Message,
  Icon,
  Popup,
  Feed,
  Segment,
} from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'
import AddFeed from './add-feed'
import { queries, util } from '../lib'

const IssueDetail = ({ issueDetailId, setIssueDetailId }) => {
  const { loading, error, data } = useQuery(queries.ISSUE_DETAIL, {
    variables: {
      id: issueDetailId,
    },
  })

  if (!!loading) return <Loader active />

  if (!!error)
    return (
      <Container style={{ marginTop: '1rem' }}>
        <Message
          error
        >{`Failed to get client detail: ${error.message ||
          error}`}</Message>
      </Container>
    )

  if (!data.issue || !data.issue.id)
    return (
      <Container style={{ marginTop: '1rem' }}>
        <Message
          error
        >{`Failed to get client detail: Query returned empty data set.`}</Message>
      </Container>
    )

  const { issue } = data

  const handleClose = () => setIssueDetailId(null)

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Header as='h2' attached='top'>
        Issue: {issue.title}
      </Header>

      <Segment attached='bottom'>
        <div style={{ float: 'right' }}>
          <Popup
            content='Hide Issue Feed'
            position='top center'
            trigger={
              <Icon
                onClick={handleClose}
                link
                name='x'
                size='large'
              />
            }
          />
        </div>

        <AddFeed {...{ id: data.issue.id }} />

        <Feed>
          {issue.feed.map(({ id, message, timestamp }) => {
            const date = util.formatDate({ dateString: timestamp })

            return (
              <Feed.Event
                key={id}
                size='large'
                icon='thumbtack'
                date={date}
                content={message}
              />
            )
          })}
        </Feed>
      </Segment>
    </Container>
  )
}

export default IssueDetail
