import { openDatabase, SQLite } from 'react-native-sqlite-storage'


export default class Database {

    /****************************** Data base creation, manipulation and config ******************************/

    initDB() {
        const db = openDatabase({name: 'data.db'})
        return(db)
    }

    synchroniser = (table_to_sync, data_to_sync) => {
        switch (table_to_sync){
            case 'Products': this.DeleteTableProducts().then(()=>{ this.insertIntoProducts(data_to_sync) }).catch(()=>{ }); break;
            case 'Areas': this.DeleteTableAreas().then(()=>{ this.insertIntoAreas(data_to_sync) }).catch(()=>{ }); break;
            case 'Configuration': this.DeleteTableConfigurations().then(()=>{ this.insertIntoConfigurations(data_to_sync) }).catch(()=>{ }); break;
            case 'Users': this.DeleteTableUsers().then(()=>{ this.insertIntoUsers(data_to_sync) }).catch(()=>{ }); break;
            default: break;
        }
    }

    createDatabase(){
        const  db = this.initDB()
        db.executeSql('SELECT 1 FROM Users LIMIT 1', [], ()=>{ console.log('database exists') }, () => {
            console.log('creating database')
            this.createTableUsers()
            .then(()=>{ this.createTableConfiguration() })
            .then(()=>{ this.createTableInventaires() })
            .then(()=>{ this.createTableDetails() })
            .then(()=>{ this.createTableProducts() })
            .then(()=>{ this.createTableAreas() })
            .then(()=>{ console.log('database created') })
        })
    }

    /****************************************** Products Handling ******************************************/

    createTableProducts(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Products (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table products created')
                })
            })
        })
    }

    DeleteTableProducts(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Products', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table products deleted')
                })
            })
        })
    }

    insertIntoProducts(data_to_insert){
        console.log('insert products')
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Products (id, code, name) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name],)
                })
            }
            resolve(console.log('products inserted'))
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

    /****************************************** Areas Handling ******************************************/

    createTableAreas(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Areas (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table areas created')
                })
            })
        })
    }

    DeleteTableAreas(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Areas', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table areas deleted')
                })
            })
        })
    }

    insertIntoAreas(data_to_insert){
        console.log('insert areas')
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Areas (id, code, name) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name],)
                })
            }
            resolve(console.log('Areas inserted'))
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

    /****************************************** Users Handling ******************************************/

    createTableUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users (id INTEGER UNIQUE PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL UNIQUE, contact TEXT NOT NULL, isAdmin INTEGER NOT NULL DEFAULT 0)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table users created')
                })
            })
        })
    }

    DeleteTableUsers(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Users', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Users deleted')
                })
            })
        })
    }

    insertIntoUsers(data_to_insert){
        console.log('insert users')
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Users (id, username, password, contact, isAdmin) VALUES (?, ?, ?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].username, data_to_insert[i].password, data_to_insert[i].contact, data_to_insert[i].isAdmin],)
                })
            }
            resolve(console.log('users inserted'))
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

    /****************************************** Configuration Handling ******************************************/

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

    DeleteTableConfigurations(){
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Configuration', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Configuration deleted')
                })
            })
        })
    }

    insertIntoConfigurations(data_to_insert){
        console.log('insert Configuration')
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Configuration (key, state) VALUES (?, ?)', 
                    [data_to_insert[i].key, data_to_insert[i].state],)
                })
            }
            resolve(console.log('configuration inserted'))
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

    /****************************************** Inventories Handling ******************************************/

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