const router = require("express").Router();
const User = require("../models/user");
const { getCurrentUser } = require("../controllers/users");

router.get("/me", (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(console.error);
});

// router.post("/", (req, res) => {
//   console.log("Add user");
//   User.create(req.body)
//     .then((user) => res.status(201).send(user))
//     .catch(console.error);
// });

module.exports = router;
