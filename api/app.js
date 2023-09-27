const express = require("express");
var cors = require('cors')
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandle");
const addressRoute = require("./routes/addressRoutes");
const agentRoutes = require("./routes/agentRoutes");
const informationRouter = require("./routes/informationRoutes");
const fcmRoutes = require("./routes/fcmRoute");
const sendFcmNotification = require("./routes/sendNotification");
const auth = require("./routes/userRoute");
const ratelimit = require('express-rate-limit')
const helmet = require('helmet') 
const xss = require('xss-clean')
const hpp = require('hpp')


app.use(cors())
app.use(cors({
  origin: '*'
}));
app.use(helmet())

 
  app.use(morgan("dev"));
 

const limiter = ratelimit({
max:1000,
windowMs: 60 * 60 * 1000,
message:'Too many rquests from this ip, please try again in an hour!'

})

app.use('/api',limiter)
app.use(express.json({limit:'10kb'}));
 
app.use(xss())
app.use(hpp()) 

app.use(express.static(`${__dirname}/public`))
app.use((req, res, next)=>{
  req.requestTime = new Date().toISOString()
   next()
})
 
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/agent", agentRoutes);
app.use("/api/v1/information", informationRouter);
app.use("/api/v1/fcm", fcmRoutes);
app.use("/api/v1/sendFcmNotification", sendFcmNotification);
app.use("/api/v1/user",auth);



app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
