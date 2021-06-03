import React from 'react'
import {TouchableOpacity, Text, Alert} from 'react-native'
import Database from '../Storage/Database'


const db = new Database()

export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity 
            style={{backgroundColor:'#D0312D', justifyContent:'center', height:"60%", marginRight:5}} 
            onPress={()=>{db.synchroniser(), Alert.alert('Synchronisation', 'Synchronisation effectuée')}}>
                <Text style={{fontSize:12, margin: 3, color:'white'}}>Synchroniser</Text>
            </TouchableOpacity>
        )
    }
}

