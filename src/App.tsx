import React, { FC } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Title } from './components/Title'
import { Container } from 'react-bootstrap'
import { Cards } from './components/Cards'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

export const App: FC = () => (
  <ApolloProvider client={client}>
    <Container fluid>
      <Title />
      <Cards />
    </Container>
  </ApolloProvider>
)
