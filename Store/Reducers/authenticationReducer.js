const initialState = { authenticated: false }


function authReducer(state = initialState, action) {
  let nextState
  
  switch (action.type) {
    case 'LOGIN':
      nextState = {
        ...state,
        authenticated: true,
        user_token:action.value
      }
      return nextState
    case 'LOGOUT':
      nextState = {
        ...state,
        authenticated: false
      }
      return nextState || state
    default:
      return state
  }
}

export default authReducer