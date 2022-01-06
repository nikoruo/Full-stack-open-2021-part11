import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {

  //1: lisätään annettu ääni anekdootille
  //2: luodaan uusi anekdootti
  case 'VOTE': {
    const id = action.data.id
    const anecdoteToChange = state.find(n => n.id === id)
    const changedAnecdote = {
      ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    }

    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote
    ).sort((b, a) => a.votes - b.votes)
  }
  case 'NEW': {
    return [...state, action.data].sort((b, a) => a.votes - b.votes)
  }
  case 'INIT_ANECDOTES': {
    return action.data
  }
  default:
    return state.sort((b, a) => a.votes - b.votes)
  }
}

//action creator, jolla haetaan anecdootit json serveriltä
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

//action creator, jolla hoidetaan äänen antaminen
export const voteAnecdote = (anecdote) => {
  console.log('vote', anecdote.id)
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    const id = votedAnecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

//action creator, jolla hoidetaan uuden anekdootin luominen
export const createAnecdote = (content) => {
  console.log('create', content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer