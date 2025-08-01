const express = require("express");
const router = express.Router();
const book = require("./book")

router.get("/", (req, res) => {
    return res.status(200).json({
      status: true,
      version: "1.0",
      message: "Rest API sqlite"
    });
  });

router.use("/book", book);

module.exports = router;