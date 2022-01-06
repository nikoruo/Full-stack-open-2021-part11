const filterReducer = (state = '', action) => {
  switch (action.type) {

  //1: filterin muutos
  case 'SET_FILTER': {
    return action.data.filter
  }
  default:
    return state
  }
}

//action creator, jolla päivitetään filtteriä
export const setFilter = (filter) => {
  console.log('filttering', filter)
  return {
    type: 'SET_FILTER',
    data: { filter }
  }
}

export default filterReducer