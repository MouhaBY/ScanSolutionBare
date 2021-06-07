

const API_TOKEN = "f78171b682bc4c08986c8067a8113ce6"


export function getProducts() {
    //const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    /*
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    */
    return new Promise((resolve, reject) => { resolve( { results: [ {code: "P11111", name: "111111"}, {code: "P222222", name: "222222"},  ] } ) })
}

export function getLocations() {
    /*const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    */
    return new Promise((resolve, reject) => { resolve( { results: [ {code: "A11111", name: "111111"}, {code: "A222222", name: "222222"},  ] } ) })
}

export function getInventories() {
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getUsers() {
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getConfiguration() {
    /*const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    */
    return new Promise((resolve, reject) => { resolve( { results: [ {key:"withLocationVerification", state:0}, {key:"withBarcodeVerification", state:0}, {key:"withQuantity", state:0} ] } ) })
}

export function getWhatToSync(){
    /*
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    */
    return new Promise((resolve, reject) => { resolve( { results: ['Products', 'Areas', 'Configuration'] } ) })
}