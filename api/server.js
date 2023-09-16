const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });



mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
