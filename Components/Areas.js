import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import Database from '../Storage/Database'


const db = new Database()

export default class Areas extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Areaslist:[]
        }
    }

    get_Areas = () => {
        db.getAreas()
        .then((data) => { this.setState({Areaslist:data}) })
        .catch(()=>{ console.log('catch') })
    }

    componentDidMount(){
        this.get_Areas()
    }

    _renderItem = ({item}) => (
        <TouchableOpacity 
        style={styles.table_row}>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.code}</Text>
            <Text style={[styles.table_row_txt, {width: "50%"}]}>{item.name}</Text>
        </TouchableOpacity>
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
                        data={this.state.Areaslist}
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
        height:35,
        textAlign:"center",
        fontSize:14, 
        backgroundColor:'#eff6fc',
    },    
})