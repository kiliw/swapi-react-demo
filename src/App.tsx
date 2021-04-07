import React, { FC } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Title } from './components/Title'
import { Container } from 'react-bootstrap'
import { Characters } from './components/Characters'
import * as R from 'ramda'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            merge: R.mergeDeepRight,
          },
        },
      },
    },
  }),
})

export const App: FC = () => (
  <ApolloProvider client={client}>
    <Title />
    <Container>
      <Characters />
    </Container>
  </ApolloProvider>
)
