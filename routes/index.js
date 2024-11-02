const router = require("express").Router();
const userRouter = require("./users");
const newsItemsRouter = require("./newsItems");

router.use("/users", userRouter);
router.use("/articles", newsItemsRouter);

module.exports = router;
