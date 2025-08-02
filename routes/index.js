const express = require("express");
const router = express.Router();
const user = require("./user")
const game = require("./game")

router.get("/", (req, res) => {
    return res.status(200).json({
      status: true,
      version: "1.0",
      message: "Rest API sqlite"
    });
  });

router.use("/auth", user);
router.use("/game", game);

module.exports = router;