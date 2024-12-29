const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many request, please try again later.",
  },
});

module.exports = limiter;
