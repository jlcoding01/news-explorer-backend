const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const {
  validateUserBody,
  validateUserLogIn,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { DATABASE_URL } = require("./utils/config");

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateUserLogIn, login);

app.use(auth);
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
