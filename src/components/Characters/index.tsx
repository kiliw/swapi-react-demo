import React, { FC } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Alert, Button, Spinner } from 'react-bootstrap'
import { CardsComponent, Character } from './Component'
import * as R from 'ramda'

const CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
        prev
      }
      results {
        name
        species
        image
        id
      }
    }
  }
`

interface QueryResult {
  info: {
    next: number
    prev: number
    pages: number
  }
  characters: {
    results: ReadonlyArray<Character>
  }
}

export const Characters: FC = () => {
  const { loading, error, data, fetchMore } = useQuery<QueryResult>(
    CHARACTERS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        page: 1,
      },
    },
  )
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

  if (!data) {
    return <Alert variant={'warning'}>There are no characters</Alert>
  }

  return (
    <>
      <CardsComponent characters={getCharacters(data)} />

      <div>
        <Button
          className="m-1"
          disabled={hasNoPrevPage(data)}
          onClick={() =>
            fetchMore({
              variables: {
                page: getPreviousPage(data),
              },
            })
          }
        >
          previous
        </Button>
        <Button
          disabled={hasNoNextPage(data)}
          onClick={() =>
            fetchMore({
              variables: {
                page: getNextPage(data),
              },
            })
          }
        >
          next
        </Button>
      </div>
    </>
  )
}

const getNextPage: (data: QueryResult) => number | undefined = R.path([
  'characters',
  'info',
  'next',
])

const getPreviousPage: (data: QueryResult) => number | undefined = R.path([
  'characters',
  'info',
  'prev',
])

const hasNoNextPage = R.pipe(getNextPage, R.isNil)
const hasNoPrevPage = R.pipe(getPreviousPage, R.isNil)

const getCharacters: (
  data: QueryResult | undefined,
) => ReadonlyArray<Character> = R.pipe(
  R.path<ReadonlyArray<Character>>(['characters', 'results']),
  R.defaultTo<ReadonlyArray<Character>>([
    { name: 'Rick', species: 'human', image: 'abc', id: '1' },
  ]),
)
