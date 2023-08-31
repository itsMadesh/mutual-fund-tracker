const { MongoClient } = require('mongodb');
const config = require('./config');

let db = null;

class MongoDB {

    static getDb() {
        return db;
    }

    static connect() {
        return new Promise((resolve, reject) => {
            try{
                MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true },(err, client)=> {
                    if (err) {
                        console.log(err);
                        return reject(err)
                    };
                    console.log("Connected successfully to mongo server");
                    db = client.db(config.mongodb.dbName);  
                    resolve();
                });
            }
            catch(err){
                console.log(err);
            }
        })
    }

    static users(){
        return db.collection("users");
    }
}

module.exports = MongoDB;