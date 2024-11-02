const express = require("express");
const mongoose = require("mongoose");

const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/newsexplorer_db")
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
