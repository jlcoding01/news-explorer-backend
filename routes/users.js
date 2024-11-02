const router = require("express").Router();

router.get("/me", () => {
  console.log("Get Me");
});

module.exports = router;
