import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  //haetaan storesta ne anekdootit, jotka halutaan n�ytt�� (otetaan siis filtteri huomioon)
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  //��nen antaminen anekdootille
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
              <button id={anecdote.content} onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }</div>
  )
}

export default AnecdoteList