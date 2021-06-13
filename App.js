import 'react-native-gesture-handler'
import React from 'react'
import AppNavigation from './Navigation/Navigation'
import {Provider} from 'react-redux'
import Store from './Store/configureStore'
import Database from './Storage/Database'


console.log('**************************************')

async function HelloDatabase(){
  const db = new Database()
  await db.createDatabase()
}

HelloDatabase()


export default class App extends React.Component{ 
  render(){
    return (
      <Provider store={Store}>
        <AppNavigation/>
      </Provider>
    )
  }
}