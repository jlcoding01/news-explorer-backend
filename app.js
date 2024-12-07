const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { getNewsItem } = require("./controllers/newsItems");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const {
  validateUserBody,
  validateUserLogIn,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.use(requestLogger);
app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateUserLogIn, login);
app.get("/articles", getNewsItem);

app.use(auth);
app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorer_db")
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
