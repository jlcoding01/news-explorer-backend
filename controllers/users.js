const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ConflictError = require("../errors/conflict-err");
const { ERROR_MESSAGES } = require("../utils/constants");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        next(new BadRequestError(ERROR_MESSAGES.INVALID));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email) {
    next(new BadRequestError(ERROR_MESSAGES.INVALID));
  }

  return User.findOne({ email })
    .then((matched) => {
      if (matched) {
        const err = new ConflictError(ERROR_MESSAGES.CONFLICT);
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
      if (err.code === 11000) {
        next(new ConflictError(ERROR_MESSAGES.CONFLICT));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(ERROR_MESSAGES.INVALID));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError(ERROR_MESSAGES.REQUIRED_FILED));
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
        next(new UnauthorizedError(ERROR_MESSAGES.INCORRECT_CREDENTIALS));
      } else {
        next(err);
      }
    });
};

module.exports = { getCurrentUser, createUser, login };
