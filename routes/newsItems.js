const router = require("express").Router();

router.get("/", () => {
  console.log("Get news");
});

router.post("/", () => {
  console.log("Post news");
});

router.delete("/articleId", () => {
  console.log("Get news");
});

module.exports = router;
