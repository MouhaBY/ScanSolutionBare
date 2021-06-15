import React from 'react'
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'
import { getWhatToSync, getProducts, getLocations, getConfiguration, getUsers } from '../WS/API'
import Database from '../Storage/Database'


const db = new Database()


export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
    }

    SyncingAlgorithm = async () => {
        try {
            const data = await getWhatToSync()
            const isSynced = await this.SyncTables(data.results)
            if (isSynced) { Alert.alert('Synchronisation', 'Synchronisation terminée') }
            else { Alert.alert('Synchronisation', 'Terminal à jour') }
        }
        catch (err) { Alert.alert('Erreur Synchronisation', 'Synchronisation echouée') }
    }

    SyncTables = async (results) => {
        let len = results.length
        if (len > 0){
            for (let i = 0; i < len; i++) {
                let table_to_sync = results[i]
                let data_to_sync = await this.getDataToSync(table_to_sync)
                if (data_to_sync.length > 0){ 
                    await this.synchroniser(table_to_sync, data_to_sync)
                }
                else { console.log(" data vierge ") }
            }
            return(true)
        }
        else { console.log(' Rien à synchroniser '); return(false) }
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

    synchroniser = async (table_to_sync, data_to_sync) => {
        switch (table_to_sync){
            case 'Products':
                try{
                    await db.DeleteTableProducts()
                    await db.insertIntoProducts(data_to_sync)
                    return(true)
                } catch(err) { return (false) }                    
            case 'Areas': 
                try{
                    await db.DeleteTableAreas()
                    await db.insertIntoAreas(data_to_sync) 
                    return(true)
                } catch(err) { return (false) }
            case 'Configuration': 
                try{
                    await db.DeleteTableConfigurations()
                    await db.insertIntoConfigurations(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            case 'Users': 
                try{
                    await db.DeleteTableUsers()
                    await db.insertIntoUsers(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            default: return(false);
        }
    }
    
    render(){
        return(
            <TouchableOpacity 
            style={styles.touchableButton} 
            onPress={()=>{ this.SyncingAlgorithm() }}>
                <Text style={styles.textButton}>Synchroniser</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableButton:{
        backgroundColor:'#D0312D', 
        justifyContent:'center', 
        height:"60%", 
        marginRight:5
    },
    textButton:{
        fontSize:12, 
        margin: 3, 
        color:'white'
    },
})
