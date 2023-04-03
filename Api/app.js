const express = require("express");
const app = express();
const morgan = require('morgan')



const fancyService = require('./routes/fancyService');

// MIDLWARE
app.use(morgan('dev'));

app.use(express.json());


//routes
app.use('/api/v1/fancyService', fancyService);

    

    module.exports = app;