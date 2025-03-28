const mongoose = require("mongoose"); 
const app = require("./app");
const passport = require('passport');
const dotenv = require("dotenv");
 
dotenv.config({ path: "./config.env" });


 
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 1995;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
