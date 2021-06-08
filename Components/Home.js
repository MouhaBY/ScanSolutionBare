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
                    {this.props.user_token.isAdmin == 1 &&
                    <TouchableOpacity 
                    style={[styles.buttonContainer, {backgroundColor:'#bdbdbd'}]}
                    onPress={() => {this.accessMenu("Configuration")}}>
                        <Text style={styles.textButtonContainer}>Configuration</Text>
                    </TouchableOpacity>
                    }
                    <View style={styles.viewMiniButtonContainer}>
                        <TouchableOpacity 
                        style={[styles.miniButtonContainer, {marginRight:"2%"}]}
                        onPress={() => {this.accessMenu("Articles")}}>
                            <Text style={styles.textButtonContainer}>Articles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.miniButtonContainer}
                        onPress={() => {this.accessMenu("Emplacements")}}>
                            <Text style={styles.textButtonContainer}>Empl.</Text>
                        </TouchableOpacity>
                    </View>
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
        height: 50,
        marginTop: 20,
        borderRadius: 5,
    },
    viewMiniButtonContainer:{
        flexDirection:'row', 
        marginTop: 20, 
        marginHorizontal:20, 
    },
    miniButtonContainer:{
        justifyContent:'center', 
        width:"49%", 
        height: 50, 
        borderRadius: 5,
        backgroundColor:'#004578',
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