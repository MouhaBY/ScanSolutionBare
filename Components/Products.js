import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import Database from '../Storage/Database'


const db = new Database()

export default class Products extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Productslist:[]
        }
    }

    get_Products = async () => {
        let Productslist = await db.getProducts()
        try{
            this.setState({Productslist})
        }
        catch(err){ 
            console.log('catch') 
        }
    }

    componentDidMount(){
        this.get_Products()
    }

    _renderItem = ({item}) => (
        <View 
        style={styles.table_row}>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.code}</Text>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.name}</Text>
        </View>
    )

    render(){
        return(
            <View style={styles.main_container} >
                <View style={{alignItems: 'center', justifyContent: 'center', height:"80%"}}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "50%"}]}>Code</Text>
                        <Text style={[styles.table_header_txt, {width: "50%"}]}>Name</Text>
                    </View>
                    <FlatList
                        data={this.state.Productslist}
                        keyExtractor={(item) => item.id}
                        renderItem={this._renderItem}
                        >
                    </FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
        backgroundColor:'white',
        marginBottom:0
    },
    top_container:{
        backgroundColor:'#2196F3',
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
    title_container:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
    },
    table_header:{
        flexDirection:'row', 
        marginTop:3, 
        backgroundColor:'#71afe5'
    },
    table_header_txt:{
        fontWeight:'bold', 
        textAlign:"center", 
        padding:5, 
        color:'white', 
        fontSize:16, 
        height:40
    },
    table_row:{
        flexDirection: "row", 
        height: 40, 
        alignItems:"center",
        justifyContent:'center',
    },
    table_row_txt:{
        padding:5, 
        height:38,
        textAlign:"center",
        fontSize:14, 
        backgroundColor:'#eff6fc',
    },    
})