const mongo=require("mongoose")

const request=mongo.Schema({
    name:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    massage:{
        type:String,
        require:true
    },
})

module.exports=mongo.model("request",request);