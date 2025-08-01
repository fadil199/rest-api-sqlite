const router = require("express").Router()
const books = require("../cotrollers")

router.post("/registerBook", books.bookControllers.registerBook);

module.exports = router;