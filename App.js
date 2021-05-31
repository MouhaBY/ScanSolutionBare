import 'react-native-gesture-handler'
import React from 'react'
import SearchNavigation from './Navigation/Navigation'
import {Provider} from 'react-redux'
import Store from './Store/configureStore'


export default class App extends React.Component{
  render(){
    return (
      <Provider store={Store}>
        <SearchNavigation/>
      </Provider>
    )
  }
}