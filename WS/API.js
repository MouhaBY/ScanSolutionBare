import store from '../Redux/configureStore'

const API_TOKEN = "f78171b682bc4c08986c8067a8113ce6"

function getAddress(){
    let state = store.getState()
    let serverAddress = state.configReducer.serverAddress
    return serverAddress
}

export async function getWhatToSync(){
    let serverAddress = getAddress()
    try{
        const response = await fetch('http://'+serverAddress+'/api/synchronisations/all')
        const { results } = await response.json()
        return results
    }
    catch(err){
        return { results: [] }
    }
}

export async function getProducts() {
    let serverAddress = getAddress()
    try{
        const response = await fetch('http://'+serverAddress+'/api/products/all')
        const { results } = await response.json()
        return results
    }
    catch(err){
        return { results: [] }
    }
}

export async function getLocations() {
    let serverAddress = getAddress()
    try{
        const response = await fetch('http://'+serverAddress+'/api/locations/all')
        const { results } = await response.json()
        return results
    }
    catch(err){
        return { results: [] }
    }
}

export async function getUsers() {
    let serverAddress = getAddress()
    try{
        const response = await fetch('http://'+serverAddress+'/api/auth/all')
        const { results } = await response.json()
        return results
    }
    catch(err){
        return { results: [] }
    }
}

export async function getConfiguration() {
    let serverAddress = getAddress()
    try{
        const response = await fetch('http://'+serverAddress+'/api/configurations/all')
        const { results } = await response.json()
        return results
    }
    catch(err){
        return { results: [] }
    }
}


/*export function getInventories() {
    //const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}*/

/*
export const sendInventoriesDetails = async (inventoriesData) => {
    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({inventoriesData}),
    })
  
    if (response.ok) {
      return true
    }
  
    const errMessage = await response.text()
    throw new Error(errMessage)
}
*/
/*
  export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results
  }
*/