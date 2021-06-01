import { openDatabase, } from 'react-native-sqlite-storage'


export default class Database {

    initDB() {
        const db = openDatabase({name: 'data.db', createFromLocation: 1})
        return(db)
    }

    searchUser(username) {
        const  db = this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT * FROM Users where username = ?', [username], 
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

    getConfiguration() {
        const  db = this.initDB()
        return new Promise((resolve) => {
            const configuration = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT key, state FROM Configuration', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { key, state } = row
                        configuration.push({
                            key,
                            state,
                          })
                    }   
                    resolve(configuration)              
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
        console.log(item)
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Details (inventory_id, location, barcode, quantity, user_id) VALUES (?, ?, ?, ?, ?)', item,
                (tx, results) => {
                    console.log('done')
                    resolve(results)
                })
            })
        })
    }

}
