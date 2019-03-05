const winston = require("winston");

//Logger
const fileLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/logs.log" })
  ]
});

const errorHandler = (err, req, res, next) => {
  //logging errors to file
  fileLogger.log({ level: "error", message: err.message });

  res.status(err.status || 500).failure("Internal server error.");
};

module.exports = errorHandler;
