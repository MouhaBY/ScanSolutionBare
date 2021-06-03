import { openDatabase, } from 'react-native-sqlite-storage'


export default class Database {

    /****************************** Data base creation, manipulation and config ******************************/

    initDB() {
        const db = openDatabase({name: 'data.db'})
        return(db)
    }

    synchroniser(){ }

    createDatabase(){
        const  db = this.initDB()
        db.executeSql('SELECT 1 FROM Users LIMIT 1', [], ()=>{ console.log('database exists') }, () => {
            console.log('creating database')
            this.createTableUsers()
            .then(()=>{ this.insertDefaultUsers() })
            .then(()=>{ this.createTableConfiguration() })
            .then(()=>{ this.insertDefaultConfiguration() })
            .then(()=>{ this.createTableInventaires() })
            .then(()=>{ this.createTableDetails() })
            .then(()=>{ this.createTableProducts() })
            .then(()=>{ this.insertDefaultProducts() })
            .then(()=>{ this.createTableAreas() })
            .then(()=>{ this.insertDefaultAreas() })
            .then(()=>{ console.log('database created') })
        })
    }

    /****************************** Products Handling ******************************/

    createTableProducts(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Products (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table products created')
                })
            })
        })
    }

    insertDefaultProducts(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'INSERT INTO Products (code, name) VALUES ("1", "Article 1"), ("2","Article 2"), ("6194007510014","SABRINE 1.5L") ', [],
                (tx, results) => {
                    resolve(results) 
                    console.log('products inserted')
                })
            })
        })
    }

    getProducts() {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const products = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Products', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        products.push({
                            id,
                            code,
                            name
                          })
                    }   
                    resolve(products)              
                })
            })
        })
    }
    
    searchProduct(barcode) {
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT * FROM Products WHERE code = ?', [barcode],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('article introuvable') }
                })
            })
        })
    }

    /******************************Areas Handling ******************************/

    createTableAreas(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Areas (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table areas created')
                })
            })
        })
    }

    insertDefaultAreas(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Areas (code, name) VALUES ("10", "Emp 1"), ("20","Emp 2")', [],
                (tx, results) => { 
                    resolve(results) 
                    console.log('Areas inserted')
                })
            })
        })
    }

    getAreas() {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const areas = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Areas', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        areas.push({
                            id,
                            code,
                            name
                          })
                    }   
                    resolve(areas)              
                })
            })
        })
    }

    searchArea(location) {
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT * FROM Areas WHERE code = ?', [location],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('emplacement introuvable') }
                })
            })
        })
    }

    /****************************** Users Handling ******************************/

    createTableUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL UNIQUE, contact TEXT NOT NULL, isAdmin INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table users created')
                })
            })
        })
    }

    insertDefaultUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Users (username, password, contact, isAdmin) VALUES ("123","123","MBY", 1), ("Test","test","MBY Test", 0), ("1","1","MBY 1", 0)', [],
                (tx, results) => { 
                    resolve(results) 
                    console.log('users inserted')
                })
            })
        })
    }

    searchUser(username) {
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT * FROM Users WHERE username = ?', [username],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('utilisateur introuvable') }
                })
            })
        })
    }

    /****************************** Configuration Handling ******************************/

    createTableConfiguration(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Configuration (key TEXT UNIQUE PRIMARY KEY, state INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => {
                    resolve(results) 
                    console.log('table configuration created')
                })
            })
        })
    }

    insertDefaultConfiguration(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Configuration (key, state) VALUES ("withLocationVerification", 1), ("withBarcodeVerification", 1), ("withQuantity", 0)', [],
                (tx, results) => {
                    resolve(results) 
                    console.log('configuration inserted')
                })
            })
        })
    }

    getConfiguration(configuration_key) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT state FROM Configuration WHERE key = ?', [configuration_key],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { 
                        resolve(results.rows.item(0)) 
                        console.log('get configuration ' + configuration_key)
                    }
                    else{ reject('configuration introuvable') } 
                })
            })
        })
    }

    updateConfiguration(configuration_item){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'UPDATE Configuration SET state = ? WHERE key = ? ', configuration_item,
                (tx, results) => {
                    resolve(results) 
                    console.log('configuration updated')
                })
            })
        })
    }

    /****************************** Inventories Handling ******************************/

    createTableInventaires(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Inventaires (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, date TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results) 
                    console.log('table inventaires created')
                })
            })
        })
    }

    insertInventaire(inventaire){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'INSERT INTO Inventaires (name, date) VALUES (?, ?)', inventaire,
                (tx, results) => { resolve(results) })
            })
        })
    }

    createTableDetails(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Details (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, inventory_id INTEGER NOT NULL, location TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL NOT NULL, user_id INTEGER)', [], 
                (tx, results) => { 
                    resolve(results) 
                    console.log('table details created')
                })
            })
        })
    }

    getInventaires() {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const inventaires = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, name, date FROM Inventaires', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, name, date } = row
                        inventaires.push({
                            id,
                            name,
                            date
                          })
                    }   
                    resolve(inventaires)              
                })
            })
        })
    }

    getDetailsInventaires(id_inventaire) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const details = []
            db.transaction((tx) => {
                tx.executeSql('SELECT id, location, barcode, quantity FROM Details WHERE inventory_id = ?', [id_inventaire],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i)
                            const { id, location, barcode, quantity } = row
                            details.push({
                                id, 
                                location, 
                                barcode, 
                                quantity
                              })
                        } 
                        resolve(details)  
                    }
                    else{ reject('inventaire introuvable') }
                })
            })
        })
    }

    addDetailInventaire(item) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Details (inventory_id, location, barcode, quantity, user_id) VALUES (?, ?, ?, ?, ?)', item,
                (tx, results) => { resolve(results) })
            })
        })
    }

    deleteDetailInventaire(item_id){
        const  db = this.initDB()
        return new Promise((resolve) => { db.transaction((tx) => { tx.executeSql('DELETE FROM Details WHERE id = ?', [item_id], 
            ([tx, results]) => { resolve(results) }) })
        })
    }

}