const notificationReducer = (state = { anecdote: '', timerId: null }, action) => {
  switch (action.type) {
  //1: lis�� notificationin n�kyviin
  //2: poistaa sen n�kyvist�
  case 'SET_NOTIFICATION': {

    //tarkistetaan, onko notification jo n�kyviss�, mik�li on, nollataan sen timer
    if (state.timerId !== null) {
      clearTimeout(state.timerId)
    }
    return { anecdote: action.data.anecdote, timerId: action.data.timerId }
  }
  case 'REMOVE_NOTIFICATION': {
    return { anecdote: '', timer: null }
  }
  default:
    return state
  }
}

//action creator, jolla notificaatio n�kyviin
export const setNotification = (anecdote, time) => {
  console.log('set notification', anecdote)
  return async dispatch => {
    const timerId = setTimeout(() => {
      dispatch(removeNotification())
    }, time*1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { anecdote, timerId }
    })
  }
}

//action creator, jolla notificaatio pois n�kyvist�
export const removeNotification = () => {
  console.log('remove notification')
  return { type: 'REMOVE_NOTIFICATION' }
}

export default notificationReducer