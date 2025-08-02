const router = require("express").Router();
const control = require("../cotrollers");

router.post("/inputGame", control.game.inputGame);

module.exports = router;