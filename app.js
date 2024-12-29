const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const rateLimiter = require("./middlewares/rateLimiter");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { DATABASE_URL } = require("./utils/config");

const app = express();

const { PORT = 3001 } = process.env;

app.use(helmet());
app.use(rateLimiter);

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
