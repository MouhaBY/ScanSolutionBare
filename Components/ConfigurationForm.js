import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import Database from '../Storage/Database'


const db = new Database()

export default class ConfigurationForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            withLocationVerification: false,
            withBarcodeVerification: false,
            withQuantity: false,
        }
    }

    cast_to_bool(data_state){ if (data_state > 0) { return true } else { return false } }

    cast_from_bool(bool_state){ if (bool_state == true){ return 1 } else { return 0} }

    componentDidMount(){
        db.getConfiguration("withLocationVerification").then((data) => { this.setState({withLocationVerification: this.cast_to_bool(data.state)}) })
        db.getConfiguration("withBarcodeVerification").then((data) => { this.setState({withBarcodeVerification: this.cast_to_bool(data.state)}) })
        db.getConfiguration("withQuantity").then((data) => { this.setState({withQuantity: this.cast_to_bool(data.state)}) })    
    }

    submitConfig(){
        db.updateConfiguration([this.cast_from_bool(this.state.withBarcodeVerification),"withBarcodeVerification"])
        db.updateConfiguration([this.cast_from_bool(this.state.withLocationVerification),"withLocationVerification"])
        db.updateConfiguration([this.cast_from_bool(this.state.withQuantity),"withQuantity"])
    }

    render(){
        return(
            <View style={{flex:1}}>
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
                    <View style={styles.checkbox_container}>
                        <CheckBox style={{margin:5}} value={this.state.withQuantity} onValueChange={(withQuantity) => this.setState({ withQuantity })} />
                        <Text>{this.state.withQuantity ? "Inventaire quantitatif" : "Inventaire unitaire"}</Text>
                    </View>
                </View>
                <Button title='Valider la configuration' onPress={()=>{this.submitConfig()}}/>
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