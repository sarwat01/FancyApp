const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,'address must have name'],
    trim:true,
    unique:true
},
note:String,
createdAt:{
    type:Date,
    default:Date.now()
}

})

const address = mongoose.model('address',addressSchema);

module.exports= address;