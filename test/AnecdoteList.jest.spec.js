import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import AnecdoteList from '../src/components/AnecdoteList'


const anecdoteList = [{
  content: 'bulbasaur',
  votes: 5,
  id: 1
}, {
  votes: 3,
  content: 'eevee',
  id: 133
}]

describe('<PokemonList />', () => {
  it('should render items', () => {
    render(
      <BrowserRouter>
        <AnecdoteList anecdotes={anecdoteList} />
      </BrowserRouter>
    )
    expect(screen.getByText('bulbasaur')).toBeVisible()
    expect(screen.getByText('eevee')).toBeVisible()
  })
})