
const express = require("express");
const app = express()
const fileUpload = require('express-fileupload')
const path = require("path")

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
  })
  
  app.post("/upload", 
  fileUpload({createParentPath:true}),
  (req, res) => {
    const file = req.files;
    console.log(file);
  
    return res.json({status:'logges', message:'logged'})
  }
  )


  const port = 1200;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});