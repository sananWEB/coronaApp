const mongo=require("mongoose")

mongo.Promise=global.Promise;
require("dotenv").config(); 
mongo.connect(process.env.DB,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }).then(()=>{console.log("DataBase is Connected")}).catch(()=>{
    console.log("Database is not connected")
})  