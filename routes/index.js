const router = require("express").Router();
const userRouter = require("./users");
const newsItemsRouter = require("./newsItems");

router.use("/users", userRouter);
router.use("/articles", newsItemsRouter);

router.use((req, res, next) => {
  next(new Error("Requested resource not found"));
});

module.exports = router;
