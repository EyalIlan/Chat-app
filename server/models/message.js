const mongoose = require('mongoose')


const messageSchema = mongoose.Schema({

    message:{
        type:String,
        required:true,
        trim:true
    },
    room:{
        type:String,
        required:true,
    },
    time:{
        type:String
    },
    name:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:false,
    }
},{timestamps: true})

const messages = mongoose.model('message',messageSchema)

module.exports = messages