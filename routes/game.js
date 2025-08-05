const router = require("express").Router();
const control = require("../cotrollers");
const limiter = require("../middleware/rateLimiter");

router.post("/inputGame", control.game.inputGame);
router.get("/getAllGame", limiter.rl, control.game.getAllGame);

module.exports = router;