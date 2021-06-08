const API_TOKEN = "f78171b682bc4c08986c8067a8113ce6"


export function getWhatToSync(){
    return new Promise((resolve, reject) => { 
        resolve( { results: ['Products', 'Areas', 'Configuration', 'Users'] } ) 
    })
}

export function getProducts() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:"1", code: "P11111", name: "111111"}, {id:"2", code: "P222222", name: "222222"},  ] } ) 
    })
}

export function getLocations() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:"1", code: "A11111", name: "111111"}, {id:"2", code: "A222222", name: "222222"},  ] } ) 
    })
}

/*export function getInventories() {
    //const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}*/

export function getUsers() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:1, username:"123", password:"123", contact:'Admin 123', isAdmin:1}, {id:2, username:"1", password:"1", contact:'user 1', isAdmin:0}, {id:3, username:"Test", password:"test", contact:'test user 1', isAdmin:0} ] } ) })
}

export function getConfiguration() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {key:"withLocationVerification", state:0}, {key:"withBarcodeVerification", state:0}, {key:"withQuantity", state:0} ] } ) })
}