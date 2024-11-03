const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err.name);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email) {
    next(new Error("Email or password is required!"));
  }

  return User.findOne({ email })
    .then((matched) => {
      if (matched) {
        const err = new Error("The email is already exists!");
        err.code = 11000;
        throw err;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err.name);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new Error("Email and password are required!"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.message === "Incorrect email or password") {
        next(new Error("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, login };
