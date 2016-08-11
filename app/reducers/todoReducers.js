import Immutable from 'immutable';

let defaultState = {
  data: {
    todosList: []
  },
  status: {},
};

export default function todos(state=defaultState, action) {
  switch (action.type) {
    case 'ADD_TODO': 
      return {
        ...state,
        data: {
          ...state.data,
          todos: [
          ...state.todos,
            {
              text: action.text,
              completed: false
            }
          ]
        }
      }

    case 'REMOVE_TODO': 
      return {
        ...state
      }

    case 'CLEAR_TODOS':
      return {
        defaultState
      }

  default:
    return state
  }
}






