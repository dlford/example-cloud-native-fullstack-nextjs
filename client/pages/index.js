import React, { useState } from 'react'
import Head from 'next/head'
import { withApollo } from '../lib'
import { Container, Header } from 'semantic-ui-react'
import IssueList from '../components/issue-list'
import IssueDetail from '../components/issue-detail'

const Home = () => {
  const [issueDetailId, setIssueDetailId] = useState(null)

  return (
    <div>
      <Head>
        <title>Issue Tracker</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css'
        />
      </Head>

      <Container fluid>
        <Header
          as='h1'
          dividing
          textAlign='center'
          style={{ padding: '1rem' }}
        >
          Issue Tracker
        </Header>

        <IssueList {...{ issueDetailId, setIssueDetailId }} />

        {!!issueDetailId && (
          <IssueDetail {...{ issueDetailId, setIssueDetailId }} />
        )}
      </Container>
    </div>
  )
}

export default withApollo(Home)
