const express = require("express");
const router = express.Router();
const { getAsync } = require("../redis/index");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const statistics = await getAsync("added_todos");
  res.send(statistics);
});

module.exports = router;
