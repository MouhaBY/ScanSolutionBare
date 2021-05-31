import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"
import { connect } from 'react-redux'

import LoginForm from '../Components/LoginForm'
import Home from '../Components/Home'
import InventoriesMenu from '../Components/InventoriesMenu'
import InventoriesDetailsMenu from '../Components/InventoriesDetailsMenu'
import InventorierForm from '../Components/InventorierForm'
import InventoryDetails from '../Components/InventoryDetails'
import ConfigurationForm from '../Components/ConfigurationForm'
import store from '../Store/configureStore'
import SyncButton from '../Components/SyncButton'


const Stack = createStackNavigator()

const SearchNavigation = () => {    
    const state = store.getState()
    const authenticated = state.authenticated

    if (authenticated) {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{headerRight:()=>(<SyncButton/>)}}/>
                    <Stack.Screen name="Inventaires" component={InventoriesMenu}/>
                    <Stack.Screen name="Détails Inventaires" component={InventoriesDetailsMenu}/>
                    <Stack.Screen name="Inventorier" component={InventorierForm}/>
                    <Stack.Screen name="Détails" component={InventoryDetails}/>
                    <Stack.Screen name="Configuration" component={ConfigurationForm}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
                    }
    else {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Connexion" component={LoginForm}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
      authenticated: state.authenticated
    }
  }
  
  export default connect(mapStateToProps)(SearchNavigation)