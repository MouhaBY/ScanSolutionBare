import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Button, Alert} from 'react-native'
import { connect } from 'react-redux'
import BottomBar from './BottomBar'


class Home extends React.Component 
{
    constructor(props){
        super(props)
    }

    logout(){
        const action = { type: "LOGOUT", value: false }
        this.props.dispatch(action)
    }

    accessMenu(key){
        this.props.navigation.navigate(key)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <TouchableOpacity 
                    style={[styles.buttonContainer, {backgroundColor:'#2196F3'}]}
                    onPress={() => {this.accessMenu("Inventaires")}}>
                        <Text style={styles.textButtonContainer}>Inventaire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[styles.buttonContainer, {backgroundColor:'#757575'}]}
                    onPress={() => {this.accessMenu("Détails Inventaires")}}>
                        <Text style={styles.textButtonContainer}>Détails</Text>
                    </TouchableOpacity>
                    {this.props.user_token.isAdmin &&
                    <TouchableOpacity 
                    style={[styles.buttonContainer, {backgroundColor:'#c7e0f4'}]}
                    onPress={() => {this.accessMenu("Configuration")}}>
                        <Text style={styles.textButtonContainer}>Configuration</Text>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity 
                    style={[styles.buttonContainer, {backgroundColor:'#D0312D'}]}
                    onPress={() => {this.logout()}}>
                        <Text style={styles.textButtonContainer}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
                <BottomBar style={{bottom: 0}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        justifyContent:'center', 
        marginHorizontal:20, 
        height: 55, 
        marginTop: 20, 
        borderRadius: 5 
    },
    textButtonContainer:{
        textAlign: 'center',
        color:'white', 
        fontSize: 20,
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        user_token: state.user_token
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Home)