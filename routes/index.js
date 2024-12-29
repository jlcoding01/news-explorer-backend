const router = require("express").Router();
const userRouter = require("./users");
const newsItemsRouter = require("./newsItems");
const NotFoundError = require("../errors/not-found-err");

router.use("/users", userRouter);
router.use("/articles", newsItemsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
