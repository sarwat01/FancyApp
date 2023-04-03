const express = require('express');
const fancyService = require ('../controllers/fancyService')

const router = express.Router();

router
.route('/')
.get(fancyService.getAllFancyServices)
.post(fancyService.createfancyService)

router
.route('/:id')
.get(fancyService.getfancyService) 


module.exports = router ; 