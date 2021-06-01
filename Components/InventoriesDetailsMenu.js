import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import Database from '../Storage/Database'


const db = new Database()

class InventoriesDetailsMenu extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            inventaires: []
        }
    }

    accessInventoryDetails = (item) => {
       this.props.navigation.navigate("Détails", {inventory_token:item})
      }
    
    getInventoriesList = () => {
        db.getInventaires().then((data) => {this.setState({inventaires:data}) })
    }

    componentDidMount(){
        this.getInventoriesList()
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textContainer}>Choix d'inventaire à consulter</Text>
                <FlatList 
                    style= {styles.mainList}
                    data={this.state.inventaires}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                    <TouchableOpacity
                    onPress = {() => this.accessInventoryDetails(item)} 
                    style={styles.mainInventory}>
                        <Text style={{fontWeight:'bold', color:'#eeeeee'}}>{item.name + " "}</Text>
                        <Text style={{color:'#eeeeee'}}>{"Date " + item.date}</Text>
                    </TouchableOpacity>
                )}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,
        },
        mainList:{
            flex:1,
        },
        textContainer:{
            justifyContent:'center',
            alignItems:'center',
            fontWeight:'bold',
            fontSize:20,
            margin:10,
            padding:5
        },
        mainInventory:{
            height: 65,
            padding:10,
            borderRadius: 5,
            margin: 1,
            backgroundColor: "#757575"
        },
    }
)

export default InventoriesDetailsMenu