import { combineReducers, createStore } from 'redux';
import authReducer from './Reducers/authenticationReducer'


export default createStore(authReducer)