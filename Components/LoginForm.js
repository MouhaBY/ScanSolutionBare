import React from 'react'
import { View, Text, StyleSheet, Button, Image, Alert, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Database from '../Storage/Database'
import { LOGIN, LOGOUT } from '../Store/Reducers/authenticationReducer'


const db = new Database()


class LoginForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            isFormValid: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.username !== prevState.username || this.state.password !== prevState.password) {
          this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    _login = async () => {
        if (this.state.username !== "" && this.state.password !== "") {
            try{
                let user_found = await db.searchUser(this.state.username)
                if (this.state.password === user_found.password) {
                    const action = { type: LOGIN, value: user_found }
                    this.props.dispatch(action)
                }
                else { 
                    Alert.alert('Accès interdit', 'Mot de passe erroné')
                    const action = { type: LOGOUT, value: {} }
                    this.props.dispatch(action)
                }
            }
            catch(err) {
                Alert.alert('Accès interdit', 'Utilisateur introuvable')
                const action = { type: LOGOUT, value: {} }
                this.props.dispatch(action)
            }
        }
    }

    handleUsernameUpdate = username => { this.setState({username}) }

    handlePasswordUpdate = password => { this.setState({password}) }

    render(){
        return(
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View 
                    style={styles.container}>
                        <Image source={require('../Images/logo.png')} style={styles.image}/>
                        <Text style={styles.textcontainer}>Scan Solutions</Text>
                        <TextInput 
                            value={this.state.username} 
                            onChangeText={this.handleUsernameUpdate} 
                            style={styles.inputContainer} 
                            placeholder="Nom d'utilisateur"
                            autoFocus={true}
                            ref={(input) => { this.firstTextInput = input }}
                            //blurOnSubmit={false}
                            onSubmitEditing={() => { this.secondTextInput.focus() }}
                            />
                        <TextInput 
                            value={this.state.password} 
                            onChangeText={this.handlePasswordUpdate} 
                            style={styles.inputContainer} 
                            placeholder='Mot de passe' 
                            secureTextEntry={true}
                            autoCapitalize='none'
                            ref={(input) => { this.secondTextInput = input }}
                            onSubmitEditing={() => { this._login() }}
                        />
                        <Button 
                            title={'Se connecter'} 
                            style={styles.buttonContainer} 
                            onPress={() => this._login()} 
                            disabled={!this.state.isFormValid}
                            />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"10%"
    },
    textcontainer:{
        fontWeight: "bold",
        fontSize: 24, 
        marginBottom:40, 
        color:"black",
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginBottom: 15,
        width: "80%",
        height: 50,
    },
    image:{
        width: 70,
        height: 80,
        margin: 10,
        resizeMode: 'stretch',
    }
  })

  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)