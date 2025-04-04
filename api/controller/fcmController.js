const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const fcmService = require('../services/fcmServices');

const postToken = catchAsync(async (req, res) => {
    const token = await fcmService.createFCM();
      res.send({'token':token})
});

  
const create = catchAsync(async (req, res) => { 
 const fcm = await fcmService.create(req.body)
res.send(fcm)
});


const getAll = catchAsync(async (req, res)=>{
    const fcm = await fcmService.getAll()
    res.send(fcm) 
})


const getOne = catchAsync(async (req, res)=>{
    console.log(req.params.id);
    const fcm = await fcmService.getOne(req.params.id)
    res.send(fcm) 
})

const deleteFcm = catchAsync(async (req, res)=>{
     const fcm = await fcmService.getOne(req.params.id)
    res.send(fcm) 
})

module.exports = {
    create,
    getAll,
    getOne,
    deleteFcm,
    postToken

}