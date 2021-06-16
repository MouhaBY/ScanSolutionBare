import { combineReducers, createStore } from 'redux';
import authReducer from './Reducers/authenticationReducer'


const reducer = combineReducers({
    authenticated : authReducer,
    user_token : authReducer,
})

const store = createStore(authReducer)

export default store