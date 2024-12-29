const router = require("express").Router();
const {
  getNewsItem,
  createNewsItem,
  deleteNewsItem,
} = require("../controllers/newsItems");
const { validateNewsItem, validateId } = require("../middlewares/validation");

router.get("/", getNewsItem);

router.post("/", validateNewsItem, createNewsItem);

router.delete("/:articleId", validateId, deleteNewsItem);

module.exports = router;
