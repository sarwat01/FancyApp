const mongoose = require('mongoose')


const informationSchema = new mongoose.Schema({
title:{
    type:String,
    required:true, 
    min:[3,'title character must more than 3 character'],
    max:[50,'title character must less than 50 character'],
 },
 detail:{
    type:String,
    required:true, 
 }, 
 createdAt:{
    type:Date,
    default:Date.now()
 }


})

const information = mongoose.model('information',informationSchema)

module.exports = information