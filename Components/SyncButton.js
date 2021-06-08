import React from 'react'
import { TouchableOpacity, Text, Alert } from 'react-native'
import { getWhatToSync, getProducts, getLocations, getConfiguration, getUsers } from '../WS/API'
import Database from '../Storage/Database'


const db = new Database()

export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
    }

    SyncingAlgorithm = () => { 
        return new Promise((resolve, reject) => {
        getWhatToSync()
        .then(data=>{ this.SyncTables(data.results) })
        .then(()=>{ resolve(' Synchro terminée ') })
        .catch(()=>{ reject('erreur synchro') })
        })
    }

    SyncTables = (results) => {
        return new Promise((resolve, reject) => {
        let len = results.length
        if (len > 0){
            for (let i = 0; i < len; i++) {
                let table_to_sync = results[i]
                this.getDataToSync(table_to_sync).then(data =>{ if (data.length > 0){ db.synchroniser(table_to_sync, data) }
                else { console.log(" data vierge ") }})
            }
            resolve(' Synchro terminée ')
        }
        else { resolve(console.log(' Rien à synchroniser ')) }
        })
    }
    
    getDataToSync = (table_to_sync) => {
        console.log("table a synchroniser " + table_to_sync);
        return new Promise((resolve, reject) => {
            switch (table_to_sync){
                case 'Products': getProducts().then(data =>{ resolve(data.results) }); break;
                case 'Areas': getLocations().then(data =>{ resolve(data.results) }); break;
                case 'Configuration': getConfiguration().then(data =>{ resolve(data.results) }); break;
                case 'Users': getUsers().then(data =>{ resolve(data.results) }); break;
                default: resolve([]); break;
            }
        })
    }
    
    render(){
        return(
            <TouchableOpacity 
            style={{backgroundColor:'#D0312D', justifyContent:'center', height:"60%", marginRight:5}} 
            onPress={()=>{ this.SyncingAlgorithm().then(()=>{ Alert.alert('Synchronisation', 'Synchronisation terminée') })
            .catch(()=>{ Alert.alert('Erreur Synchronisation', 'Synchronisation echouée') })
            }}>
                <Text style={{fontSize:12, margin: 3, color:'white'}}>Synchroniser</Text>
            </TouchableOpacity>
        )
    }
}