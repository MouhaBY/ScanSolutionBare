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
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT * FROM Inventaires', [],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) {
                        resolve(results.rows.item(0))
                    }
                    else{
                        reject('table vide')
                    }
                })
            })
        })
    }

}
