const express = require("express");
// const path = require('path');
require("express-async-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const error = require("./middleware/error");
const users = require("./routes/users");
const app = express();
var jsend = require("./plugin/jsend");

if (!config.get("secret")) {
  console.error(
    "FATAL ERROR: Secret for JWT is not defined, please check the README file."
  );
  process.exit(1);
}

const corsOptions = {
  exposedHeaders: "x-auth-token"
};

mongoose
  .connect(config.get("dbUrl"), { useNewUrlParser: true })
  .then(() => console.log("Database connected...."))
  .catch(err => console.log("Could not connect to the DB", err.message));

app.use(jsend());
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", users);
app.use(error);

module.exports = app;
