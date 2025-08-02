const router = require("express").Router()
const control = require("../cotrollers")
const midle = require("../middleware/auth");
const roles = require("../utils/roles");

router.post("/register", control.user.register);
router.post("/login", control.user.login);
router.get("/me", midle(roles.user), control.user.me);

module.exports = router;