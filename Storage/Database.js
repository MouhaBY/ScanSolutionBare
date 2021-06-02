import { openDatabase, } from 'react-native-sqlite-storage'


export default class Database {

    initDB() {
        const db = openDatabase({name: 'data.db'})
        db.executeSql('SELECT 1 FROM Users LIMIT 1', [], ()=>{}, () => { this.createDatabase() })
        return(db)
    }

    createDatabase(){
        console.log('creating database')
        this.createTableUsers()
        .then(()=>{ this.createTableConfiguration() })
        .then(()=>{ this.createTableInventaires() })
        .then(()=>{ this.createTableDetails() })
        .then(()=>{ console.log('database created') })
    }

    createTableUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL UNIQUE, contact TEXT NOT NULL, isAdmin INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => { 
                    this.insertDefaultUsers()
                    resolve(results) 
                })
            })
        })
    }

    insertDefaultUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Users (username, password, contact, isAdmin) VALUES ("123","123","MBY", 1), ("Test","test","MBY Test", 0)', [],
                (tx, results) => { 
                    resolve(results) 
                    console.log('users inserted')
                })
            })
        })
    }

    createTableConfiguration(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Configuration (key TEXT UNIQUE PRIMARY KEY, state INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => { 
                    this.insertDefaultConfiguration()
                    resolve(results) 
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

    createTableInventaires(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Inventaires (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, date TEXT NOT NULL)', [], 
                (tx, results) => { 
                    resolve(results) 
                })
            })
        })
    }

    insertInventaire(inventaire){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Inventaires (name, date) VALUES (?, ?)', inventaire,
                (tx, results) => { 
                    resolve(results) 
                })
            })
        })
    }

    createTableDetails(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS Details (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, inventory_id INTEGER NOT NULL, location TEXT NOT NULL, barcode TEXT NOT NULL, quantity REAL NOT NULL, user_id INTEGER)', [], 
                (tx, results) => { 
                    resolve(results) 
                })
            })
        })
    }

    searchUser(username) {
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT * FROM Users WHERE username = ?', [username],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        resolve(results.rows.item(0))
                    }
                    else{
                        reject('utilisateur introuvable')
                    }
                })
            })
        })
    }

    getInventaires() {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const products = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, name, date FROM Inventaires', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, name, date } = row
                        products.push({
                            id,
                            name,
                            date
                          })
                    }   
                    resolve(products)              
                })
            })
        })
    }

    getConfiguration(configuration_key) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const configuration = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT state FROM Configuration WHERE key = ?', [configuration_key],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        resolve(results.rows.item(0))
                    }
                    else{
                        reject('configuration introuvable')
                    } 
                })
            })
        })
    }

    getDetailsInventaires(id_inventaire) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const details = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, location, barcode, quantity FROM Details WHERE inventory_id = ?', [id_inventaire],
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
                    else{
                        reject('inventaire introuvable')
                    }
                })
            })
        })
    }

    addDetailInventaire(item) {
        const  db = this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Details (inventory_id, location, barcode, quantity, user_id) VALUES (?, ?, ?, ?, ?)', item,
                (tx, results) => {
                    resolve(results)
                })
            })
        })
    }

    deleteDetailInventaire(item_id){
        const  db = this.initDB()
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Details WHERE id = ?', [item_id],
                ([tx, results]) => {
                  resolve(results)
                })
            })
        })
    }

    updateConfiguration(configuration_item){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Configuration SET state = ? WHERE key = ? ', configuration_item,
                (tx, results) => {
                    resolve(results) 
                    console.log('configuration updated')
                })
            })
        })
    }

}