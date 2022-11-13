const mongoose = require('mongoose')
const Message = require('./message')

const roomSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    avatar:{
        type:Buffer,
        required:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    ingroup:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }]
},{timestamps: true})


roomSchema.pre('remove',async function(next){



    next()
})


const Room =  mongoose.model('room',roomSchema)

module.exports = Room