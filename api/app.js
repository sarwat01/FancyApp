const express = require("express");
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
const sendFcmNotification = require("./routes/fcmRoute");
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/address", addressRoute);
app.use("/api/v1/agent", agentRoutes);
app.use("/api/v1/information", informationRouter);
app.use("/api/v1/fcm", fcmRoutes);
app.use("/api/v1/sendFcmNotification", sendFcmNotification);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
