import React from 'react'
import { TouchableOpacity, Text, Alert, StyleSheet, Image } from 'react-native'
import RNBeep from 'react-native-a-beep'

import { getWhatToSync, getProducts, getLocations, getConfiguration, getUsers } from '../WS/API'
import User from '../Models/Users'
import Product from '../Models/Products'
import Configuration from '../Models/Configurations'
import Area from '../Models/Areas'


const user = new User()
const product = new Product()
const configuration = new Configuration()
const area = new Area()


export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading:false
        }
    }

    SyncingAlgorithm = async () => {
        try {
            console.log('***synchronisation***')
            this.setState({isLoading:true})
            const data = await getWhatToSync()
            const isSynced = await this.SyncTables(data)
            if (isSynced) { Alert.alert('Synchronisation', 'Synchronisation terminée') }
            else { Alert.alert('Synchronisation', 'Terminal à jour') }
            RNBeep.beep()
            this.setState({isLoading:false})
        }
        catch (err) { 
            RNBeep.beep(false)
            this.setState({isLoading:false})
            Alert.alert('Erreur', 'Synchronisation échouée') 
        }
    }

    SyncTables = async (results) => {
        let len = results.length
        if (len > 0){
            for (let i = 0; i < len; i++) {
                let table_to_sync = results[i].key
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
                case 'Products': getProducts().then(data =>{ resolve(data) }); break;
                case 'Areas': getLocations().then(data =>{ resolve(data) }); break;
                case 'Configuration': getConfiguration().then(data =>{ resolve(data) }); break;
                case 'Users': getUsers().then(data =>{ resolve(data) }); break;
                default: resolve([]); break;
            }
        })
    }

    synchroniser = async (table_to_sync, data_to_sync) => {
        switch (table_to_sync){
            case 'Products':
                try{
                    await product.DeleteTableProducts()
                    await product.insertIntoProducts(data_to_sync)
                    return(true)
                } catch(err) { return (false) }                    
            case 'Areas': 
                try{
                    await area.DeleteTableAreas()
                    await area.insertIntoAreas(data_to_sync) 
                    return(true)
                } catch(err) { return (false) }
            case 'Configuration': 
                try{
                    await configuration.DeleteTableConfigurations()
                    await configuration.insertIntoConfigurations(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            case 'Users': 
                try{
                    await user.DeleteTableUsers()
                    await user.insertIntoUsers(data_to_sync)
                    return(true)
                } catch(err) { return (false) }
            default: return(false);
        }
    }
    
    render(){
        return(
            <TouchableOpacity 
            style={styles.touchableButton} 
            disabled={this.state.isLoading}
            onPress={()=>{ this.SyncingAlgorithm() }}>
                <Image style={styles.icon} source={require('../Images/index.png')}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableButton:{
        justifyContent:'center', 
        height:"60%", 
        marginRight:5
    },
    textButton:{
        fontSize:12, 
        margin: 3, 
        color:'white'
    },
    icon:{
        height:45,
        width:45
    }
})
