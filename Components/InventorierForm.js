import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { color } from 'react-native-reanimated'
import { connect } from 'react-redux'
import Database from '../Storage/Database'


const db = new Database()

class InventorierForm extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            location: '',
            barcode: '',
            quantity: '1',
            inventory_token: '',
            isFormValid: false,
            inventoryRows: [],
            message_barcode: '',
            message_location: '',
            message:'',
            configuration:[],
            withQuantity: false,
            withLocationVerification : true,
            withBarcodeVerification : true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.withQuantity !== prevState.withQuantity){
            db.updateConfiguration([this.cast_from_bool(this.state.withQuantity),"withQuantity"])
        }
        if (this.state.location !== prevState.location || this.state.barcode !== prevState.barcode || this.state.quantity !== prevState.quantity){
            if(this.state.location !== '' && this.state.barcode !== '') {
                this.setState({message: ''})
                this.setState({message_location: ''})
                this.setState({message_barcode: ''})
            }
            this.validateForm()
        }
    }

    validateForm = () => {
        if (this.state.location !== "" && this.state.barcode !== "" && this.state.quantity > 0) { this.setState({isFormValid: true}) }
        else { this.setState({isFormValid: false}) }
    }

    cast_from_bool(bool_state){ if (bool_state == true){ return 1 } else { return 0} }

    cast_to_bool(data_state){ if (data_state > 0) { return true } else { return false } }

    componentDidMount(){
        const inventory_token_const = this.props.route.params.inventory_token
        this.setState({inventory_token: inventory_token_const})
        db.getConfiguration("withQuantity").then((data) => { this.setState({withQuantity: this.cast_to_bool(data.state)}) })
        db.getConfiguration("withLocationVerification").then((data) => { this.setState({withLocationVerification: this.cast_to_bool(data.state)}) })
        db.getConfiguration("withBarcodeVerification").then((data) => { this.setState({withBarcodeVerification: this.cast_to_bool(data.state)}) })
    }

    _verify_exists(inventory_row){
        if (this.state.withBarcodeVerification){
            db.searchProduct(inventory_row.Barcode)
            .then(()=>{ 
                if (this.state.withLocationVerification){
                    db.searchArea(inventory_row.Location)
                    .then(()=>{ this.submit(inventory_row) })
                    .catch(()=>{ this.setState({message_location: 'Emplacement ' + inventory_row.Location + ' non reconnu'}) })
                }
                else { this.submit(inventory_row) }})
            .catch(()=>{
                this.setState({message_barcode: 'Article ' + inventory_row.Barcode +  ' non reconnu'})
                this.setState({barcode: ''})
            })
        }
        else {
            if (this.state.withLocationVerification){
                db.searchArea(inventory_row.Location)
                .then(()=>{ this.submit(inventory_row) })
                .catch(()=>{ this.setState({message_location: 'Emplacement ' + inventory_row.Location + ' non reconnu'}) })
            }
            else { this.submit(inventory_row) }
        }
    }

    _reset_form_values(){
        this.setState({barcode: ''})
        this.setState({quantity: '1'})
    }

    submit(inventory_row) {
        db.addDetailInventaire([this.state.inventory_token.id, inventory_row.Location, inventory_row.Barcode, Number(inventory_row.Quantity), this.props.user_token.id])
            .then(() =>{
                this.setState({message: 'Article ' + inventory_row.Barcode +' Enregistré'})
                this._reset_form_values()
            })
    }

    accessInventoryDetails = (item) => { this.props.navigation.navigate("Détails", {inventory_token:item}) }

    render(){        
        return(
            <View style={{flex:1,}}>
                <TouchableOpacity style={styles.top_container} onPress = {() => this.accessInventoryDetails(this.state.inventory_token)} >
                    <Text style={styles.title_container}>{"Inventaire en cours : " + this.state.inventory_token.name}</Text>
                    <Text style={{color:'white'}}>{"Id de l'inventaire " + this.state.inventory_token.id + " | Date du "+ this.state.inventory_token.date}</Text>
                </TouchableOpacity>
                {this.props.user_token.isAdmin == 1 &&
                <View style={styles.checkbox_container}>
                    <Text>{this.state.withQuantity ? "Inventaire quantitatif" : "Inventaire unitaire"}</Text>
                    <CheckBox style={{margin:5}} value={this.state.withQuantity} onValueChange={(withQuantity) => this.setState({ withQuantity })} />
                </View>
                }
                <View style={styles.main_container}>
                        <Text style={styles.text_container}>Code emplacement</Text>
                        <TextInput
                        value={this.state.location} 
                        onChangeText={(location) => this.setState({ location })} 
                        style={styles.input_container} 
                        autoFocus={true}
                        onFocus={() => this.setState({location: ''})}
                        placeholder= "Emplacement"
                        //blurOnSubmit={false}
                        onSubmitEditing={() => { this.secondTextInput.focus() }}/>
                        <Text style={styles.error_message}>{this.state.message_location}</Text>
                        <Text style={styles.text_container}>Code article</Text>
                        <TextInput
                        value={this.state.barcode} 
                        ref={(input) => { this.secondTextInput = input }}
                        onChangeText={(barcode) => this.setState({ barcode })} 
                        style={styles.input_container} 
                        onFocus={() => this.setState({barcode: ''})}
                        blurOnSubmit={false}
                        placeholder= "Code à barre"
                        onSubmitEditing={() => {
                            if (this.state.withQuantity){ this.thirdTextInput.focus() }
                            else { if (this.state.isFormValid) {
                                this._verify_exists({Location:this.state.location, Barcode: this.state.barcode, Quantity: this.state.quantity})} } }}
                        />
                        <Text style={styles.error_message}>{this.state.message_barcode}</Text>
                        {this.state.withQuantity &&
                        <View style={{alignItems:'center', marginBottom:5}}>
                            <Text style={styles.text_container}>Quantité</Text>
                            <TextInput
                                value={this.state.quantity} 
                                keyboardType="numeric"
                                ref={(input) => { this.thirdTextInput = input }}
                                onChangeText={(quantity) => this.setState({ quantity })} 
                                style={styles.input_container} 
                                placeholder= "Quantité"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    if (this.state.isFormValid) {
                                        this._verify_exists({Location:this.state.location, Barcode: this.state.barcode, Quantity: this.state.quantity})
                                        this.secondTextInput.focus()
                                    }
                                }}
                            />
                        </View>
                        }
                        <Text style={{color:'green', margin:1}}>{this.state.message}</Text>
                        <Button 
                        title='                                   submit                                   '
                        disabled={!this.state.isFormValid}
                        onPress={() => {
                            this._verify_exists({Location:this.state.location, Barcode: this.state.barcode, Quantity: this.state.quantity})
                            this.secondTextInput.focus()
                        }
                                }
                        autoFocus={true}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top_container:{
        backgroundColor:'#2196F3', 
        justifyContent:'center', 
        alignItems:'center', 
        height:50
    },
    checkbox_container:{
        height:20,
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'flex-end', 
        margin:5
    },
    main_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    input_container:{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginBottom: 3,
        width: "80%",
        height: 40,
    },
    title_container:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
    },
    text_container:{
        margin:3,
        fontWeight:'bold',
    },
    error_message:{
        color:'red', 
        marginBottom:1
    }
})

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        user_token: state.user_token,
    }
  }

export default connect(mapStateToProps)(InventorierForm)