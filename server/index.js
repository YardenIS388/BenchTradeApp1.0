require("dotenv").config();
require("express-async-errors");
const { logger: errLogger } = require("./middleware/loggers/error.logger");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const { usersRouter } = require("./routes/users.router");
const { authRouter } = require("./routes/auth.router");
const { errorHandler } = require("./middleware/errorHandler.mw");
const logPath = path.join(__dirname, "logs", "http.log");
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  logger(":date --> :method :url :status :response-time ms", {
    stream: fs.createWriteStream(logPath, { flags: "a" }),
  })
);


const allowedOrigins = ["http://localhost:19000", "http://30.30.2.218:8081:19000"]

app.use(cors({

    origin: function(origin, callback){
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Error middleware
app.use(errorHandler);

// Connection
app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
