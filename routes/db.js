const MongoClient = require("mongodb").MongoClient;
const objectID = require('mongodb').objectID;
const dbname = "newsfeed";
const url = "mongodb+srv://admin123:admin123@test-pditk.mongodb.net/test?retryWrites=true";
const mongoOpetions = {userNewUrlParser : true};

const state ={
    db : null

};

const connect = (cb) =>{
    if(state.db)
    cb();
    else{
        MongoClient.connect(url,mongoOpetions,(err,client)=>{
          if(err)
                cb(err);
          else{
              state.db =client.db(dbname);
              cb();

          }     

        });
    }
}
 
const getPrimaryKey =  (_id)=>{
    return objectID(_id);
}
const getDB = ()=>{
    return state.db;   
}




module.exports = {getDB,connect,getPrimaryKey};
