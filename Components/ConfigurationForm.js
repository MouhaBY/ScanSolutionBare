import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList} from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import '../global'


export default class ConfigurationForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            withLocationVerification: global.withLocationVerification,
            withBarcodeVerification: global.withBarcodeVerification,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.withLocationVerification !== prevState.withLocationVerification || this.state.withBarcodeVerification !== prevState.withBarcodeVerification) {
          global.withBarcodeVerification = this.state.withBarcodeVerification
          global.withLocationVerification = this.state.withLocationVerification
      }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textContainer}>Configuration de base</Text>
                <View style={styles.checkbox_container}>
                    <CheckBox style={{margin:5}} value={this.state.withLocationVerification} onValueChange={(withLocationVerification) => this.setState({ withLocationVerification })} />
                    <Text>{this.state.withLocationVerification ? "Vérification d'emplacement " : "Sans vérification d'emplacement "}</Text>
                </View>
                <View style={styles.checkbox_container}>
                    <CheckBox style={{margin:5}} value={this.state.withBarcodeVerification} onValueChange={(withBarcodeVerification) => this.setState({ withBarcodeVerification })} />
                    <Text>{this.state.withBarcodeVerification ? "Vérification d'articles " : "Sans vérification d'articles "}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,
        },
        textContainer:{
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
            fontWeight:'bold',
            fontSize:20,
            margin:20,
        },
        checkbox_container:{
            height:20,
            flexDirection:'row',
            alignItems:'center', 
            justifyContent:'flex-end', 
            margin:10
        },
    }
)