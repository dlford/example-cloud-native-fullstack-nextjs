import React, { useState } from 'react'
import {
  Container,
  Table,
  Message,
  Header,
  Icon,
  Popup,
  Segment,
} from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'
import RemoveIssue from './remove-issue'
import { queries, util } from '../lib'
import AddIssue from './add-issue'

const IssueList = ({ issueDetailId, setIssueDetailId }) => {
  const [removeIssueId, setRemoveIssueId] = useState()

  const { data } = useQuery(queries.ISSUE_LIST)
  const { issues } = data || []

  const handleShowDetail = ({ target }) =>
    setIssueDetailId(util.getIdAttrib(target))

  const handleRemoveIssue = ({ target }) =>
    setRemoveIssueId(util.getIdAttrib(target))

  return (
    <Container>
      <AddIssue />

      <Header as='h2' attached='top'>
        Issues
      </Header>

      {!!issues && !!issues.length && (
        <Table celled padded attached='bottom'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map(({ id, title, description }) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Popup
                    content='View Issue Feed'
                    position='top center'
                    trigger={
                      <Icon
                        onClick={handleShowDetail}
                        data-id={id}
                        link
                        name='sticky note'
                      />
                    }
                  />

                  <Popup
                    content='Remove Issue'
                    position='top center'
                    trigger={
                      <Icon
                        onClick={handleRemoveIssue}
                        data-id={id}
                        link
                        name='trash alternate'
                      />
                    }
                  />

                  {title}
                </Table.Cell>

                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {(!issues || !issues.length) && (
        <Segment attached='bottom' textAlign='center'>
          <Message color='blue' compact>
            Nice! No Issues!
          </Message>
        </Segment>
      )}

      <RemoveIssue
        {...{
          removeIssueId,
          setRemoveIssueId,
          issueDetailId,
          setIssueDetailId,
        }}
      />
    </Container>
  )
}

export default IssueList
