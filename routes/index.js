const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateUserLogIn,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const newsItemsRouter = require("./newsItems");
const NotFoundError = require("../errors/not-found-err");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUserLogIn, login);

router.use(auth);

router.use("/users", userRouter);
router.use("/articles", newsItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
