import React, { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Alert, Spinner } from 'react-bootstrap'
import { CardsComponent, Character } from './Component'
import * as R from 'ramda'

const CHARACTERS = gql`
  query getCharacters {
    characters(page: 1) {
      results {
        name
        species
        image
      }
    }
  }
`

interface QueryResult {
  characters: {
    results: ReadonlyArray<Character>
  }
}

export const Cards: FC = () => {
  const { loading, error, data } = useQuery<QueryResult>(CHARACTERS)
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  if (error) {
    return <Alert variant={'warning'}>{error.message}</Alert>
  }

  return <CardsComponent characters={getCharacters(data)} />
}

const getCharacters: (
  data: QueryResult | undefined,
) => ReadonlyArray<Character> = R.pipe(
  R.path<ReadonlyArray<Character>>(['characters', 'results']),
  R.defaultTo<ReadonlyArray<Character>>([
    { name: 'Rick', species: 'human', image: 'abc' },
  ]),
)
