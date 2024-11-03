const router = require("express").Router();
const {
  getNewsItem,
  createNewsItem,
  deleteNewsItem,
} = require("../controllers/newsItems");

router.get("/", getNewsItem);

router.post("/", createNewsItem);

router.delete("/articleId", deleteNewsItem);

module.exports = router;
