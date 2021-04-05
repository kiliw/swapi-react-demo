import React, { FC } from 'react'
import { Card } from 'react-bootstrap'
import * as R from 'ramda'

export interface Character {
  name: string
  species: string
  image: string
}

const CardComponent: FC<Character> = ({ name, species, image }) => (
  <Card key={name} style={{ width: '12rem' }} className="d-inline-block">
    <Card.Body>
      <Card.Img variant="top" src={image} />
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle>{species}</Card.Subtitle>
    </Card.Body>
  </Card>
)

interface CardsProps {
  characters: ReadonlyArray<Character>
}

export const CardsComponent: FC<CardsProps> = (R.pipe(
  R.prop<'characters', ReadonlyArray<Character>>('characters'),
  R.map(CardComponent),
) as unknown) as FC<CardsProps>
